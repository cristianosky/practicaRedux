import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContadorComponent } from './contador/contador.component';
import { InicioComponent } from './inicio/inicio.component';
import { PostsListComponent } from './posts/posts-list/posts-list.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'contador', component: ContadorComponent },
  {
    path: 'posts',
    component: PostsListComponent,
  },
  { path: 'auth', loadChildren: () => import('./core/auth/auth.module').then(m => m.AuthModule) },
  { path: '**', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
