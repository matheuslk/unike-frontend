import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ISearchFilters } from '../../data/interfaces/product-filter.interface';
import {
  ICategory,
  IFilteredProductResponse,
} from '../../data/interfaces/product.interface';
import {
  productListFeatureKey,
  ProductListState,
} from './product-list.reducer';
import { INGRXData } from 'src/app/shared/data/interfaces/ngrx-data.interface';

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
  (state: ProductListState): INGRXData<ICategory[]> => state.filters
);

export const selectSearchFilters = createSelector(
  selectProductListState,
  (state: ProductListState): ISearchFilters => state.searchFilters
);
