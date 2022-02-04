import { createAction, props } from '@ngrx/store';

export const incrementar = createAction('[Contador Component] Incrementar');
export const decrementar = createAction('[Contador Component] decrementar');
export const reset = createAction('[Contador Component] reset');

export const IncrementarPersonalizado = createAction(
  'incrementarperzonalizado',
  props<{ value: number }>()
);

export const TextoPersonalizado = createAction('TextoPersonalizado');
