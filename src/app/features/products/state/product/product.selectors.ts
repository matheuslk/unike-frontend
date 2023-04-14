import { createFeatureSelector, createSelector } from '@ngrx/store';
import { IProductResponse } from '../../data/interfaces/product.interface';
import { productFeatureKey, ProductState } from './product.reducer';
import { INGRXData } from 'src/app/shared/data/interfaces/ngrx-data.interface';

export const selectProductState =
  createFeatureSelector<ProductState>(productFeatureKey);

export const selectProduct = createSelector(
  selectProductState,
  (state: ProductState): INGRXData<IProductResponse> => state.product
);
