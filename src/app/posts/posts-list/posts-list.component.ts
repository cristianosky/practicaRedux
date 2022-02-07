import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Post } from 'src/app/model/posts.model';
import { AppState } from 'src/app/store/app.state';
import { AddPostsComponent } from '../add-posts/add-posts.component';
import { deletePost } from '../state/posts.actions';
import { getPosts } from '../state/posts.selectors';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss'],
})
export class PostsListComponent implements OnInit {
  posts$!: Observable<Post[]>;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.posts$ = this.store.select(getPosts);
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
}
