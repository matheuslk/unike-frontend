import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  set<T>(key: string, data: T): void {
    localStorage.setItem(key, JSON.stringify(data));
  }

  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) {
      return null;
    }
    return JSON.parse(data) as T;
  }

  delete(key: string): void {
    localStorage.removeItem(key);
  }
}
