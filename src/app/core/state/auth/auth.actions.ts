import { createAction, props } from '@ngrx/store';
import { ILoginResponse } from 'src/app/features/login/data/interfaces/login.interface';
import { IJWT } from '../../data/interfaces/jwt.interface';

export const check = createAction('[Auth] Check If Is Authenticated');

export const authenticate = createAction(
  '[Auth] Authenticate User With Provided JWT',
  props<{ jwtResponse: ILoginResponse }>()
);

export const setIsAuthenticated = createAction(
  '[Auth] Set Is Authenticated',
  props<{ isAuthenticated: boolean }>()
);

export const setJWT = createAction('[Auth] Set JWT', props<{ jwt: IJWT }>());

export const removeJWT = createAction('[Auth] Remove JWT');
