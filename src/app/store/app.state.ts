import { contadorReducer } from '../contador/state/contador.reducer';
import { ContadorState } from '../contador/state/contador.state';
import { postsReducer } from '../posts/state/posts.reducer';
import { PostsState } from '../posts/state/posts.state';

export interface AppState {
  contador: ContadorState;
  posts: PostsState;
}

export const appReducer = {
  contador: contadorReducer,
  posts: postsReducer,
};
