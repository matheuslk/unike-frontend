import { createFeatureSelector, createSelector } from '@ngrx/store';
import { authFeatureKey, AuthState } from './auth.reducer';
import { IJWT } from 'src/app/shared/data/interfaces/jwt.interface';

export const selectAuthState = createFeatureSelector<AuthState>(authFeatureKey);

export const selectIsAuthenticated = createSelector(
  selectAuthState,
  (state: AuthState): boolean | undefined => state.isAuthenticated
);

export const selectJWT = createSelector(
  selectAuthState,
  (state: AuthState): IJWT | undefined => state.jwt
);
