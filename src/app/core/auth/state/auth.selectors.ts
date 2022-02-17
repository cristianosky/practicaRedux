import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const getAunthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAunthState, (state) => {
  return state.user ? true : false;
});
