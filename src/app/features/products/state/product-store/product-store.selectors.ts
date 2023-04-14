import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ICategory, IProduct } from '../../data/interfaces/product.interface';
import {
  ProductStoreState,
  productStoreFeatureKey,
} from './product-store.reducer';
import { INGRXData } from 'src/app/shared/data/interfaces/ngrx-data.interface';

export const selectProductStoreState = createFeatureSelector<ProductStoreState>(
  productStoreFeatureKey
);

export const selectProduct = createSelector(
  selectProductStoreState,
  (state: ProductStoreState): INGRXData<IProduct> => state.product
);

export const selectCategories = createSelector(
  selectProductStoreState,
  (state: ProductStoreState): INGRXData<ICategory[]> => state.categories
);

export const selectViewDestroyed = createSelector(
  selectProductStoreState,
  (state: ProductStoreState): boolean => state.viewDestroyed
);
