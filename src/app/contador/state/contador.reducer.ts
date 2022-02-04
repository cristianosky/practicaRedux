import { Action, createReducer, on } from '@ngrx/store';
import {
  decrementar,
  incrementar,
  IncrementarPersonalizado,
  reset,
  TextoPersonalizado,
} from './contador.actions';
import { InicialState } from './contador.state';

// export const IniciarStado: number = 0;

const _contadorReducer = createReducer(
  InicialState,
  on(incrementar, (state) => {
    return {
      ...state,
      contador: state.contador + 1,
    };
  }),
  on(decrementar, (state) => {
    return {
      ...state,
      contador: state.contador - 1,
    };
  }),
  on(reset, (state) => {
    return {
      ...state,
      contador: 0,
    };
  }),
  on(IncrementarPersonalizado, (state, action) => {
    return {
      ...state,
      contador: state.contador + action.value,
    };
  }),
  on(TextoPersonalizado, (state) => {
    return {
      ...state,
      NombreCanal: 'Nombre modificado',
    };
  })
);

export function contadorReducer(state: any, action: Action) {
  return _contadorReducer(state, action);
}
