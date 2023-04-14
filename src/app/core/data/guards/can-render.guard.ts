import { Injectable } from '@angular/core';
import { CanLoad, Route, UrlSegment, UrlTree } from '@angular/router';
import { map, Observable, take } from 'rxjs';
import { AuthFacade } from '../../state/auth/auth.facade';

@Injectable({
  providedIn: 'root',
})
export class CanRenderGuard implements CanLoad {
  constructor(private authFacade: AuthFacade) {}

  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.authFacade.selectIsAuthenticated$().pipe(
      take(1),
      map(data => true)
    );
  }
}
