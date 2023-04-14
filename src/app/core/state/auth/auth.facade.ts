import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { ILoginResponse } from 'src/app/features/login/data/interfaces/login.interface';
import * as AuthActions from './auth.actions';
import * as AuthSelectors from './auth.selectors';
import { IJWT } from 'src/app/shared/data/interfaces/jwt.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(private store: Store) {}

  check(): void {
    this.store.dispatch(AuthActions.check());
  }

  authenticate(jwtResponse: ILoginResponse): void {
    this.store.dispatch(AuthActions.authenticate({ jwtResponse }));
  }

  removeJWT(): void {
    this.store.dispatch(AuthActions.removeJWT());
  }

  setIsAuthenticated(isAuthenticated: boolean): void {
    this.store.dispatch(AuthActions.setIsAuthenticated({ isAuthenticated }));
  }

  setJWT(jwt: IJWT): void {
    this.store.dispatch(AuthActions.setJWT({ jwt }));
  }

  selectIsAuthenticated$(): Observable<boolean | undefined> {
    return this.store
      .select(AuthSelectors.selectIsAuthenticated)
      .pipe(filter(data => data !== undefined));
  }

  selectIsAuthenticated(): Observable<boolean | undefined> {
    return this.selectIsAuthenticated$().pipe(take(1));
  }

  selectJWT$(): Observable<IJWT | undefined> {
    return this.store.select(AuthSelectors.selectJWT);
  }
}
