import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ContadorState } from './contador.state';

const GetContadorState = createFeatureSelector<ContadorState>('contador');

export const getContador = createSelector(GetContadorState, (state) => {
  return state.contador;
});

export const getCambiarNombre = createSelector(GetContadorState, (state) => {
  return state.NombreCanal;
});
