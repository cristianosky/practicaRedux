import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState } from './posts.state';

const getPostsState = createFeatureSelector<PostsState>('posts');

export const getPosts = createSelector(getPostsState, (state) => {
  return state.posts;
});

export const getPostById = createSelector(
  getPostsState,
  (state: any, props: any) => {
    let busqueda = state.posts.find((post: any) => post.id === props.cod);
    let datos: any;
    if (busqueda != undefined) {
      datos = {
        datos: busqueda,
        success: true,
      };
    } else {
      datos = {
        datos: null,
        success: false,
      };
    }
    return datos;
  }
);
