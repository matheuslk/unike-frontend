import { createFeatureSelector, createSelector } from '@ngrx/store';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';
import { IFindProductResponse } from '../../data/interfaces/product.interface';
import { productFeatureKey, ProductState } from './product.reducer';

export const selectProductState =
  createFeatureSelector<ProductState>(productFeatureKey);

export const selectProduct = createSelector(
  selectProductState,
  (state: ProductState): INGRXData<IFindProductResponse> => state.product
);
