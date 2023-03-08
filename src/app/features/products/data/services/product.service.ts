import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoints } from 'src/app/core/data/consts/endpoints.const';
import { ICategory } from '../interfaces/category.interface';
import { IProductFilter } from '../interfaces/product-filter.interface';
import { IFetchProductsResponse } from '../interfaces/product.interface';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}

  filter(filter: IProductFilter): Observable<IFetchProductsResponse[]> {
    return this.http.post<IFetchProductsResponse[]>(
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
