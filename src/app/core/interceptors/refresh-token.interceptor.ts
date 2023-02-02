import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap, take } from 'rxjs/operators';
import { ILoginResponse } from 'src/app/features/login/data/interfaces/login.interface';
import { isPrivateEndpoint } from '../data/functions/is-private-endpoint.function';
import { HttpError } from '../data/models/http-error.model';
import { AuthService } from '../services/auth.service';
import { AuthFacade } from '../state/auth/auth.facade';
@Injectable()
export class RefreshTokenInterceptor implements HttpInterceptor {
  constructor(
    private authFacade: AuthFacade,
    private authService: AuthService
  ) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (!isPrivateEndpoint(request.url)) {
      return next.handle(request);
    }
    return next.handle(request).pipe(
      catchError((error: HttpError) => {
        if (error.status === 401) {
          return this.authFacade.selectJWT$().pipe(
            take(1),
            switchMap(oldJwt => {
              if (oldJwt?.refresh_token) {
                return this.authService.refresh(oldJwt.refresh_token).pipe(
                  switchMap((response: ILoginResponse) => {
                    this.authFacade.authenticate(response);
                    request = request.clone({
                      headers: request.headers.set(
                        'Authorization',
                        `Bearer ${response.token}`
                      ),
                    });
                    return next.handle(request);
                  })
                );
              }
              return throwError(error);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
