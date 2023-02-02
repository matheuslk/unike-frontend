import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IJWT } from '../../data/interfaces/jwt.interface';
import { authFeatureKey, AuthState } from './auth.reducer';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState): boolean | undefined => state.isAuthenticated
);

export const selectJWT = createSelector(
  selectAuthState,
  (state: AuthState): IJWT | undefined => state.jwt
);
