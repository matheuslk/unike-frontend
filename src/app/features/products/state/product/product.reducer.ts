import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';
import { IFindProductResponse } from '../../data/interfaces/product.interface';
import * as ProductListActions from './product.actions';

export interface ProductState {
  product: INGRXData<IFindProductResponse>;
}

export const productFeatureKey = 'product-find';

const initialState: ProductState = {
  product: {
    data: undefined,
    error: undefined,
    isLoading: false,
  },
};

export const reducer: ActionReducer<ProductState, Action> = createReducer(
  initialState,
  on(ProductListActions.findProduct, state => {
    return {
      ...state,
      product: {
        ...state.product,
        error: undefined,
        isLoading: true,
      },
    };
  }),
  on(ProductListActions.findProductSuccess, (state, { product }) => {
    return {
      ...state,
      product: {
        ...state.product,
        data: product,
        isLoading: false,
      },
    };
  }),
  on(ProductListActions.findProductError, (state, { error }) => {
    return {
      ...state,
      products: {
        ...state.product,
        data: undefined,
        error,
        isLoading: false,
      },
    };
  })
);
