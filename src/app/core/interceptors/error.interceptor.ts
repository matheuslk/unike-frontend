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
import { ERROR_MESSAGES } from '../data/enums/error-messages.enum';
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
          error.error?.message ?? ERROR_MESSAGES.DEFAULT,
          error.error?.code ?? '0'
        );
        return throwError(httpError);
      })
    );
  }
}
