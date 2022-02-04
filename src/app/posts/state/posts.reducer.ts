import { createReducer } from '@ngrx/store';
import { InitState } from './posts.state';

const _postsReducer = createReducer(InitState);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
