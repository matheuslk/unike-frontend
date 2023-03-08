import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';
import { ICategory } from '../../data/interfaces/category.interface';
import { IProductFilter } from '../../data/interfaces/product-filter.interface';
import { IFetchProductsResponse } from '../../data/interfaces/product.interface';
import {
  productListFeatureKey,
  ProductListState,
} from './product-list.reducer';

export const selectProductListState = createFeatureSelector<ProductListState>(
  productListFeatureKey
);

export const selectProducts = createSelector(
  selectProductListState,
  (state: ProductListState): INGRXData<IFetchProductsResponse[]> =>
    state.products
);

export const selectCategories = createSelector(
  selectProductListState,
  (state: ProductListState): INGRXData<ICategory[]> => state.categories
);

export const selectFilter = createSelector(
  selectProductListState,
  (state: ProductListState): IProductFilter => state.filter
);
