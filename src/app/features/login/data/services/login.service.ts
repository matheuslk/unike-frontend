import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/shared/data/consts/endpoints.const';
import { ILoginRequest, ILoginResponse } from '../interfaces/login.interface';

@Injectable()
export class LoginService {
  constructor(private http: HttpClient) {}

  login(request: ILoginRequest): Observable<ILoginResponse> {
    return this.http.post<ILoginResponse>(endpoints.guest.login, {
      ...request,
    });
  }
}
