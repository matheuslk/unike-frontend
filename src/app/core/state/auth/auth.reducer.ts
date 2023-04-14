import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import * as AuthActions from './auth.actions';
import { IJWT } from 'src/app/shared/data/interfaces/jwt.interface';

export interface AuthState {
  isAuthenticated?: boolean;
  jwt?: IJWT;
}

export const authFeatureKey = 'auth';

const initialState: AuthState = {
  isAuthenticated: undefined,
  jwt: undefined,
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
  on(AuthActions.authenticate, (state, { jwtResponse }) => {
    return {
      ...state,
      isAuthenticated: true,
    };
  }),
  on(AuthActions.removeJWT, state => {
    return {
      ...state,
      jwt: undefined,
      isAuthenticated: false,
    };
  })
);
