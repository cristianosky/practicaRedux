import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContadorComponent } from './contador/contador.component';
import { InicioComponent } from './inicio/inicio.component';
import { AuthGuard } from './services/Auth.guard';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'contador', component: ContadorComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./core/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: 'posts',
    loadChildren: () =>
      import('./core/posts/posts.module').then((m) => m.PostsModule),
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
