import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/core/data/consts/endpoints.const';
import {
  IFiltersResponse,
  ISearchFilters,
} from '../interfaces/product-filter.interface';
import {
  IFilteredProductResponse,
  IProductResponse,
} from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  find(id: string): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(
      `${endpoints.guest.products.find + `/${id}`}`
    );
  }

  filter(filters: ISearchFilters): Observable<IFilteredProductResponse[]> {
    return this.http.post<IFilteredProductResponse[]>(
      endpoints.guest.products.filter,
      {
        ...filters,
      }
    );
  }

  fetchFilters(): Observable<IFiltersResponse> {
    return this.http.get<IFiltersResponse>(endpoints.guest.products.filters);
  }
}
