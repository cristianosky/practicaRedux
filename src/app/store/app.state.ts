import { AuthReducer } from '../core/auth/state/auth.reducer';
import { AUTH_STATE_NAME } from '../core/auth/state/auth.selectors';
import { AuthState } from '../core/auth/state/auth.state';
import { SharedReducer } from '../shared/store/shared.reducer';
import { SHARED_STATE_NAME } from '../shared/store/shared.selectors';
import { SharedState } from '../shared/store/shared.state';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
};
