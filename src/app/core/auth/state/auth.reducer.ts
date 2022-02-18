import { createReducer, on } from '@ngrx/store';
import { authLogout, loginSuccess, registeSuccess } from './auth.actions';
import { initialState } from './auth.state';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(registeSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(authLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}
