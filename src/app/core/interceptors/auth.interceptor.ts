import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { AuthFacade } from '../state/auth/auth.facade';
import { isPrivateEndpoint } from 'src/app/shared/data/functions/is-private-endpoint.function';
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authFacade: AuthFacade) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!isPrivateEndpoint(request.url)) {
      return next.handle(request);
    }
    return this.authFacade.selectJWT$().pipe(
      take(1),
      switchMap(jwt => {
        if (jwt) {
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${jwt.access_token}`,
            },
          });
        }
        return next.handle(request);
      })
    );
  }
}
