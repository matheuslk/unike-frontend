import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginResponse } from 'src/app/features/login/data/interfaces/login.interface';
import { endpoints } from '../data/consts/endpoints.const';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}

  check(): Observable<any> {
    return this.httpClient.get(endpoints.auth.check);
  }

  refresh(refresh_token: string): Observable<ILoginResponse> {
    return this.httpClient.get<ILoginResponse>(endpoints.guest.refresh, {
      headers: {
        refresh_token,
      },
    });
  }
}
