import { createReducer, on } from '@ngrx/store';
import { setErrorMensaje, setLoadingSpinner } from './shared.actions';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      ShowLoading: action.status,
    };
  }),
  on(setErrorMensaje, (state, action) => {
    return {
      ...state,
      errorMesajeError: action.mensaje,
    };
  })
);

export function SharedReducer(state: any, action: any) {
  return _sharedReducer(state, action);
}
