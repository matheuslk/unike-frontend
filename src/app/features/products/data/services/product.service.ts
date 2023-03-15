import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/core/data/consts/endpoints.const';
import { IProductFilter } from '../interfaces/product-filter.interface';
import {
  ICategory,
  IFilterProductResponse,
  IFindProductResponse,
} from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  find(id: string): Observable<IFindProductResponse> {
    return this.http.get<IFindProductResponse>(
      `${endpoints.guest.products.find + `/${id}`}`
    );
  }

  filter(filter: IProductFilter): Observable<IFilterProductResponse[]> {
    return this.http.post<IFilterProductResponse[]>(
      endpoints.guest.products.filter,
      {
        ...filter,
      }
    );
  }

  fetchCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(endpoints.guest.products.categories);
  }
}
