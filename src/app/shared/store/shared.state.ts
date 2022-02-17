export interface SharedState {
  ShowLoading: boolean;
  errorMesajeError: string;
}

export const initialState: SharedState = {
  ShowLoading: false,
  errorMesajeError: '',
};
