import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';

import {
  ISearchFilters,
  IFiltersResponse,
} from '../../data/interfaces/product-filter.interface';
import { IFilteredProductResponse } from '../../data/interfaces/product.interface';

import * as ProductListActions from './product-list.actions';
import * as ProductListSelectors from './product-list.selectors';

@Injectable()
export class ProductListFacade {
  constructor(private store: Store) {}

  fetchProducts(filters: ISearchFilters): void {
    this.store.dispatch(ProductListActions.fetchProducts({ filters }));
  }

  fetchFilters(): void {
    this.store.dispatch(ProductListActions.fetchFilters());
  }

  setSearchFilters(filters: Partial<ISearchFilters>): void {
    this.store.dispatch(ProductListActions.setSearchFilters({ filters }));
  }

  selectProducts$(): Observable<INGRXData<IFilteredProductResponse[]>> {
    return this.store.select(ProductListSelectors.selectProducts);
  }

  selectFilters$(): Observable<INGRXData<IFiltersResponse>> {
    return this.store.select(ProductListSelectors.selectFilters);
  }

  selectSearchFilters$(): Observable<ISearchFilters> {
    return this.store.select(ProductListSelectors.selectSearchFilters);
  }
}
