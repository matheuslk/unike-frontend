import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';
import {
  IFiltersResponse,
  ISearchFilters,
} from '../../data/interfaces/product-filter.interface';
import { IFilteredProductResponse } from '../../data/interfaces/product.interface';
import {
  productListFeatureKey,
  ProductListState,
} from './product-list.reducer';

export const selectProductListState = createFeatureSelector<ProductListState>(
  productListFeatureKey
);

export const selectProducts = createSelector(
  selectProductListState,
  (state: ProductListState): INGRXData<IFilteredProductResponse[]> =>
    state.products
);

export const selectFilters = createSelector(
  selectProductListState,
  (state: ProductListState): INGRXData<IFiltersResponse> => state.filters
);

export const selectSearchFilters = createSelector(
  selectProductListState,
  (state: ProductListState): ISearchFilters => state.searchFilters
);
