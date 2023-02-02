import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { IJWT } from '../../data/interfaces/jwt.interface';
import * as AuthActions from './auth.actions';

export interface AuthState {
  isAuthenticated?: boolean;
  jwt?: IJWT;
}

export const authFeatureKey = 'auth';

const initialState: AuthState = {
  jwt: undefined,
  isAuthenticated: undefined,
};

export const reducer: ActionReducer<AuthState, Action> = createReducer(
  initialState,
  on(AuthActions.setIsAuthenticated, (state, { isAuthenticated }) => {
    return {
      ...state,
      isAuthenticated,
    };
  }),
  on(AuthActions.setJWT, (state, { jwt }) => {
    return {
      ...state,
      jwt,
    };
  }),

  on(AuthActions.removeJWT, state => {
    return {
      ...state,
      isAuthenticated: false,
      jwt: undefined,
    };
  })
);
