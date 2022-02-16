import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

export const LOGIN_START = '[auth page login start]';
export const LOGIN_SUCCESS = '[auth page login success]';
export const LOGIN_FAIL = '[auth page login fail]';

export const loginStrar = createAction(
  LOGIN_START,
  props<{ email: any; password: any }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User }>()
);
