import { createReducer, on } from '@ngrx/store';
import { addPost, deletePost, updatePost } from './posts.actions';
import { InitState } from './posts.state';

const _postsReducer = createReducer(
  InitState,
  on(addPost, (state, action) => {
    let post = { ...action.post };
    post.id = (state.posts.length + 1).toString();
    return {
      ...state,
      posts: [...state.posts, post],
    };
  }),
  on(updatePost, (state, action) => {
    const updatedPost = state.posts.map((post: any) => {
      return action.post.id === post.id ? action.post : post;
    });

    return {
      ...state,
      posts: updatedPost,
    };
  }),
  on(deletePost, (state, { id }) => {
    const updatedPost = state.posts.filter((post) => {
      return post.id !== id;
    });
    console.log(updatedPost);
    return {
      ...state,
      posts: updatedPost,
    };
  })
);

export function postsReducer(state: any, action: any) {
  return _postsReducer(state, action);
}
