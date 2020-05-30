import {action, observable} from 'mobx';

import axios from 'axios';

type Post = {
  id: number;
  image: string;
  description: string;
  authorId: number;
  author: {
    id: number;
    name: string;
    avatar: string;
  };
};

export default class HomeStore {
  @observable photoReady: boolean = false;

  @observable posts: Post[] = [];

  @action getPosts = async () => {
    try {
      const {data: posts} = await axios.get<[Post]>(
        'http://localhost:3000/feed?_expand=author',
      );
      this.posts = posts;
    } catch (error) {
      console.log(error);
      this.posts = [];
    }
  };

  @action addPost = (uriPhoto: string) => {
    const post: Post = {
      author: {
        id: 2,
        name: 'brunobrancalhao',
        avatar:
          'https://avatars3.githubusercontent.com/u/26446411?s=460&u=43b31f09ef111278a5f245d70ccb9d25e75b3c52&v=4',
      },
      authorId: 2,
      description: 'irado',
      id: this.posts.length + 1,
      image: uriPhoto,
    };

    this.posts.unshift(post);
  };

  @action toogleStatus = (status: boolean) => {
    this.photoReady = status;
  };
}

const homeStore = new HomeStore();
export {homeStore};
