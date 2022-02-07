import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Post } from 'src/app/model/posts.model';
import { AppState } from 'src/app/store/app.state';
import { addPost, updatePost } from '../state/posts.actions';
import { getPostById } from '../state/posts.selectors';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.scss'],
})
export class AddPostsComponent implements OnInit {
  postForm!: FormGroup;
  codEditar!: any;

  constructor(
    private fb: FormBuilder,
    private store: Store<AppState>,
    public dialogRef: MatDialogRef<AddPostsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
    if (this.data.editar) this.geteditar(this.data.cod);
  }

  initForm() {
    this.postForm = this.fb.group({
      titulo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }

  publicar() {
    if (this.postForm.invalid) return;
    if (!this.data.editar) {
      const post: Post = {
        title: this.postForm.get('titulo')?.value,
        description: this.postForm.get('descripcion')?.value,
      };

      this.store.dispatch(addPost({ post }));

      this.postForm.reset();
    } else {
      const post: Post = {
        id: this.codEditar,
        title: this.postForm.get('titulo')?.value,
        description: this.postForm.get('descripcion')?.value,
      };

      this.store.dispatch(updatePost({ post }));
    }
    this.dialog.closeAll();
  }

  geteditar(cod: any) {
    this.store.select(getPostById, { cod }).subscribe((data: any) => {
      if (data.success) {
        this.postForm.patchValue({
          titulo: data.datos.title,
          descripcion: data.datos.description,
        });
        this.codEditar = data.datos.id;
      } else {
        const dailigo = this.dialog.closeAll();
      }
    });
  }
}
