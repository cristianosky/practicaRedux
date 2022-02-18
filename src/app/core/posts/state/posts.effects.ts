import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { map, mergeMap, switchMap } from 'rxjs/operators';
import { AppState } from 'src/app/store/app.state';
import { PostService } from '../components/service/post.service';
import {
  addPost,
  addPostSuccess,
  deletePost,
  deletePostSuccess,
  loadPosts,
  loadPostsSuccess,
  updatePost,
  updatePostSuccess,
} from './posts.actions';

@Injectable()
export class PostsEffects {
  constructor(
    private actions$: Actions,
    private _PostsService: PostService,
    private store: Store<AppState>
  ) {}

  loadPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loadPosts),
      mergeMap((action) => {
        return this._PostsService.getPosts().pipe(
          map((posts) => {
            return loadPostsSuccess({ posts });
          })
        );
      })
    );
  });

  addPosts$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(addPost),
      mergeMap((action) => {
        return this._PostsService.addPosts(action.post).pipe(
          map((data) => {
            const post = { ...action.post, id: data.name };
            return addPostSuccess({ post });
          })
        );
      })
    );
  });

  updatePosts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(updatePost),
        switchMap((action) => {
          console.log(action);
          return this._PostsService.updatePosts(action.post).pipe(
            map((data) => {
              return updatePostSuccess({ post: action.post });
            })
          );
        })
      );
    },
    { dispatch: false }
  );

  deletePosts$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(deletePost),
        switchMap((action) => {
          console.log(action);
          return this._PostsService.deletePost(action.id).pipe(
            map((data) => {
              return deletePostSuccess({ id: action.id });
            })
          );
        })
      );
    },
    { dispatch: false }
  );
}
