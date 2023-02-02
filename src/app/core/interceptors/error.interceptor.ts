import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from '../data/models/http-error.model';
import { AuthFacade } from '../state/auth/auth.facade';
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(public authFacade: AuthFacade) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        const httpError = new HttpError(
          error.status,
          error.error,
          error.error?.code,
          error.error?.message
        );
        return throwError(httpError);
      })
    );
  }
}
