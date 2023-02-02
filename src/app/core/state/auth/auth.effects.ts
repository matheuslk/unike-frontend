import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { throwError } from 'rxjs';
import { catchError, exhaustMap, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IJWT } from '../../data/interfaces/jwt.interface';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from '../../services/local-storage.service';
import * as AuthActions from './auth.actions';
import { AuthFacade } from './auth.facade';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authFacade: AuthFacade,
    private authService: AuthService,
    private localStorageService: LocalStorageService
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
            catchError(error => {
              //temporario
              console.log('ERROR', error);
              this.authFacade.removeJWT();
              return throwError(error);
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
          this.authFacade.setIsAuthenticated(true);
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
