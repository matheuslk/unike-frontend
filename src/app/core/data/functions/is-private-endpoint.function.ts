import { environment } from 'src/environments/environment';
import { endpoints } from '../consts/endpoints.const';

export function isPrivateEndpoint(requestUrl: string): boolean {
  const AUTH_ENDPOINTS = endpoints.AUTH;
  const matchedEndpoint = Object.keys(AUTH_ENDPOINTS)
    .map(key => AUTH_ENDPOINTS[key as keyof typeof AUTH_ENDPOINTS])
    .find(
      endpoint =>
        endpoint.split('?')[0].replace(environment.apiUrl, '') ===
        requestUrl.split('?')[0].replace(environment.apiUrl, '')
    );

  return matchedEndpoint ? true : false;
}
