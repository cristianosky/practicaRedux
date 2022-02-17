import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';
export const SHARED_STATE_NAME = 'shared';

const getShadredState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(getShadredState, (state) => {
  return state.ShowLoading;
});

export const getErrorMensaje = createSelector(getShadredState, (state) => {
  return state.errorMesajeError;
});
