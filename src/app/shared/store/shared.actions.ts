import { createAction, props } from '@ngrx/store';

export const SET_LOADING_ACTION = '[shared state] set loading spinner';
export const SET_ERROR_MENSAJE = '[shared state] set error mensaje';

export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setErrorMensaje = createAction(
  SET_ERROR_MENSAJE,
  props<{ mensaje: string }>()
);
