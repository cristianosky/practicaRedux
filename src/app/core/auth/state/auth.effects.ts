import { exhaustMap, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { loginStrar } from './auth.actions';
import { AuthService } from '../service/auth.service';
import { loginSuccess } from '../state/auth.actions';
import { RespondeData } from '../model/Auth.model';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private _authService: AuthService) {}

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStrar),
      exhaustMap((action) => {
        return this._authService.login(action.email, action.password).pipe(
          map((data: RespondeData) => {
            const user = this._authService.formatUser(data);
            return loginSuccess({ user });
          })
        );
      })
    );
  });
}
