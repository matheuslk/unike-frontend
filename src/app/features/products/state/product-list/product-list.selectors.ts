import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  productListFeatureKey,
  ProductListState,
} from './product-list.reducer';

export const selectProductListState = createFeatureSelector<ProductListState>(
  productListFeatureKey
);

export const selectIsFilterSidenavOpened = createSelector(
  selectProductListState,
  (state: ProductListState): boolean => state.isFilterSidenavOpened
);
