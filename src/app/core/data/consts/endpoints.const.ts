import { environment } from 'src/environments/environment';

export const endpoints = {
  auth: {
    check: `${environment.apiUrl}/check`,
  },
  guest: {
    login: `${environment.apiUrl}/login`,
    refresh: `${environment.apiUrl}/refresh`,
    products: {
      find: `${environment.apiUrl}/products`,
      filter: `${environment.apiUrl}/products/filter`,
      categories: `${environment.apiUrl}/products/categories`,
      image: `${environment.apiBaseUrl}/uploads`,
    },
  },
};
