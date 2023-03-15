import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';

import { IProductFilter } from '../../data/interfaces/product-filter.interface';
import {
  ICategory,
  IFilterProductResponse,
} from '../../data/interfaces/product.interface';

import * as ProductListActions from './product-store.actions';
import * as ProductListSelectors from './product-list.selectors';

@Injectable()
export class ProductListFacade {
  constructor(private store: Store) {}

  fetchProducts(filter: IProductFilter): void {
    this.store.dispatch(ProductListActions.fetchProducts({ filter }));
  }

  fetchCategories(): void {
    this.store.dispatch(ProductListActions.fetchCategories());
  }

  setProductFilter(filter: IProductFilter): void {
    this.store.dispatch(ProductListActions.setProductFilter({ filter }));
  }

  selectProducts$(): Observable<INGRXData<IFilterProductResponse[]>> {
    return this.store.select(ProductListSelectors.selectProducts);
  }

  selectCategories$(): Observable<INGRXData<ICategory[]>> {
    return this.store.select(ProductListSelectors.selectCategories);
  }

  selectFilter$(): Observable<IProductFilter> {
    return this.store.select(ProductListSelectors.selectFilter);
  }
}
