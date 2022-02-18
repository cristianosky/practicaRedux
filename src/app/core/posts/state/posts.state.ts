import { Post } from 'src/app/model/posts.model';

export interface PostsState {
  posts: Post[];
}

export const InitState: PostsState = {
  posts: [],
};
