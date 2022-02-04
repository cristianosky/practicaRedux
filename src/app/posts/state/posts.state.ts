import { Post } from 'src/app/model/posts.model';

export interface PostsState {
  posts: Post[];
}

export const InitState: PostsState = {
  posts: [
    {
      id: '1',
      title: 'simple title 1',
      description: 'Simple Descripcion 1',
    },
    {
      id: '2',
      title: 'simple title 2',
      description: 'Simple Descripcion 12',
    },
  ],
};
