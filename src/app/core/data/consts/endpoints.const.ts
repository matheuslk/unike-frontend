import { environment } from 'src/environments/environment';

export const endpoints = {
  AUTH: {
    check: `${environment.apiUrl}/check`,
  },
  GUEST: {
    login: `${environment.apiUrl}/login`,
    refresh: `${environment.apiUrl}/refresh`,
  },
};
