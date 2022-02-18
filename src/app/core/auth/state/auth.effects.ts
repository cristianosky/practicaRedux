import { catchError, exhaustMap, map, mergeMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import {
  authLogout,
  autoLogin,
  loginStrar,
  registeStart,
  registeSuccess,
} from './auth.actions';
import { AuthService } from '../service/auth.service';
import { loginSuccess } from './auth.actions';
import { RespondeData } from '../model/Auth.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import {
  setErrorMensaje,
  setLoadingSpinner,
} from 'src/app/shared/store/shared.actions';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private _authService: AuthService,
    private store: Store<AppState>,
    private router: Router
  ) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStrar),
      exhaustMap((action) => {
        return this._authService.login(action.email, action.password).pipe(
          map((data: RespondeData) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMensaje({ mensaje: '' }));
            const user = this._authService.formatUser(data);
            this._authService.setLocalStorage(user);
            return loginSuccess({ user, redireccion: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const error: any = this._authService.getErrorMensaje(
              errResp.error.error.message
            );
            console.log(errResp);
            return of(setErrorMensaje({ mensaje: error }));
          })
        );
      })
    );
  });

  loginRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, registeSuccess]),
        tap((action) => {
          if (action.redireccion) {
            this.router.navigate(['/inicio']);
          }
        })
      );
    },
    { dispatch: false }
  );

  register$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(registeStart),
      exhaustMap((action) => {
        return this._authService.register(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            this.store.dispatch(setErrorMensaje({ mensaje: '' }));
            const user = this._authService.formatUser(data);
            this._authService.setLocalStorage(user);
            return registeSuccess({ user, redireccion: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const error: any = this._authService.getErrorMensaje(
              errResp.error.error.message
            );
            console.log(errResp);
            return of(setErrorMensaje({ mensaje: error }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap((action) => {
        const user: any = this._authService.getUserLocalStorage();
        return of(loginSuccess({ user: user, redireccion: false }));
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(authLogout),
        map((action) => {
          this._authService.logout();
          this.router.navigate(['auth']);
        })
      );
    },
    { dispatch: false }
  );
}
