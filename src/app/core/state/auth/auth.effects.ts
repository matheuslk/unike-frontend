import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { catchError, exhaustMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import * as AuthActions from './auth.actions';
import { AuthFacade } from './auth.facade';
import { IJWT } from 'src/app/shared/data/interfaces/jwt.interface';
import { LocalStorageService } from '../../data/services/local-storage.service';
import { AuthService } from '../../data/services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authFacade: AuthFacade,
    private localStorageService: LocalStorageService,
    private authService: AuthService
  ) {}

  check$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.check),
        exhaustMap(() => {
          return this.authService.check().pipe(
            tap(() => {
              this.authFacade.setIsAuthenticated(true);
            }),
            catchError(() => {
              this.authFacade.removeJWT();
              return EMPTY;
            })
          );
        })
      ),
    {
      dispatch: false,
    }
  );

  authenticate$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.authenticate),
        tap(({ jwtResponse }) => {
          const jwt: IJWT = {
            access_token: jwtResponse.token,
            refresh_token: jwtResponse.refreshToken,
          };
          this.localStorageService.set<IJWT>(environment.JWT_KEY, jwt);
          this.authFacade.setJWT(jwt);
        })
      ),
    {
      dispatch: false,
    }
  );

  removeJWT$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.removeJWT),
        tap(() => {
          this.localStorageService.delete(environment.JWT_KEY);
        })
      ),
    {
      dispatch: false,
    }
  );
}
