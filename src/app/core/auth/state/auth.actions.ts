import { createAction, props } from '@ngrx/store';
import { User } from '../model/user.model';

// Login
export const LOGIN_START = '[auth page] login start';
export const LOGIN_SUCCESS = '[auth page] login success';
export const LOGIN_FAIL = '[auth page] login fail';

// Register
export const REGISTER_START = '[auth page]register start';
export const REGISTER_SUCCESS = '[auth page] register success';
export const REGISTER_FAIL = '[auth page] register fail';

export const AUTO_LOGIN_ACTION = '[auth pague] auto login';

export const LOGOUT_ACTION = '[auth page] logout';

export const loginStrar = createAction(
  LOGIN_START,
  props<{ email: any; password: any }>()
);

export const loginSuccess = createAction(
  LOGIN_SUCCESS,
  props<{ user: User; redireccion: boolean }>()
);

export const registeStart = createAction(
  REGISTER_START,
  props<{ email: any; password: any }>()
);

export const registeSuccess = createAction(
  REGISTER_SUCCESS,
  props<{ user: User; redireccion: boolean }>()
);

export const autoLogin = createAction(AUTO_LOGIN_ACTION);

export const authLogout = createAction(LOGOUT_ACTION);
