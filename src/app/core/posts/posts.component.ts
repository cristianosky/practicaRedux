import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/posts.model';
import { AppState } from 'src/app/store/app.state';
import { AddPostsComponent } from './components/add-posts/add-posts.component';
import { deletePost, loadPosts } from './state/posts.actions';
import { getPosts } from './state/posts.selectors';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss'],
})
export class PostsComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
    this.store.dispatch(loadPosts());
  }

  abrirmodal(cod: any, editar: boolean) {
    const dialog = this.dialog.open(AddPostsComponent, {
      width: '500px',
      data: {
        cod: cod,
        editar: editar,
      },
    });
  }

  eliminar(id: string) {
    if (confirm('Seguro que desea elimnar esta informacion')) {
      this.store.dispatch(deletePost({ id }));
    }
  }

  actualizar() {
    this.posts$ = this.store.select(getPosts);
  }
}
