import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/shared/data/consts/endpoints.const';
import { ISearchFilters } from '../interfaces/product-filter.interface';
import {
  ICategory,
  IFilteredProductResponse,
  IProduct,
  IProductFormBody,
  IProductResponse,
} from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  store(body: IProductFormBody): Observable<IProduct> {
    return this.http.post<IProduct>(`${endpoints.guest.products.store}`, {
      ...body,
    });
  }

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

  fetchCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(endpoints.guest.products.categories);
  }
}
