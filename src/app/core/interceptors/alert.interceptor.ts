import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpError } from '../data/models/http-error.model';
import { AlertService } from '../services/alert.service';
@Injectable()
export class AlertInterceptor implements HttpInterceptor {
  constructor(private alertService: AlertService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpError) => {
        debugger;
        this.alertService.showToast('error', error.message);
        return throwError(error);
      })
    );
  }
}
