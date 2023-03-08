import { environment } from 'src/environments/environment';

export const endpoints = {
  auth: {
    check: `${environment.apiUrl}/check`,
  },
  guest: {
    login: `${environment.apiUrl}/login`,
    refresh: `${environment.apiUrl}/refresh`,
    products: {
      filter: `${environment.apiUrl}/products/filter`,
      categories: `${environment.apiUrl}/products/categories`,
    },
  },
};
