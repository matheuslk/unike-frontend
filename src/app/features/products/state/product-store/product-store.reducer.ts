import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ICategory, IProduct } from '../../data/interfaces/product.interface';
import * as ProductStoreActions from './product-store.actions';
import { INGRXData } from 'src/app/shared/data/interfaces/ngrx-data.interface';

export interface ProductStoreState {
  product: INGRXData<IProduct>;
  categories: INGRXData<ICategory[]>;
  viewDestroyed: boolean;
}

export const productStoreFeatureKey = 'product-store';

const initialState: ProductStoreState = {
  product: {
    data: undefined,
    error: undefined,
    isLoading: false,
  },
  categories: {
    data: undefined,
    error: undefined,
    isLoading: false,
  },
  viewDestroyed: false,
};

export const reducer: ActionReducer<ProductStoreState, Action> = createReducer(
  initialState,
  on(ProductStoreActions.storeProduct, state => {
    return {
      ...state,
      product: {
        ...state.product,
        error: undefined,
        isLoading: true,
      },
    };
  }),
  on(ProductStoreActions.storeProductSuccess, (state, { product }) => {
    return {
      ...state,
      product: {
        ...state.product,
        data: product,
        isLoading: false,
      },
    };
  }),
  on(ProductStoreActions.storeProductError, (state, { error }) => {
    return {
      ...state,
      product: {
        ...state.product,
        data: undefined,
        error,
        isLoading: false,
      },
    };
  }),
  on(ProductStoreActions.fetchCategories, state => {
    return {
      ...state,
      categories: {
        ...state.categories,
        error: undefined,
        isLoading: true,
      },
    };
  }),
  on(ProductStoreActions.fetchCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      categories: {
        ...state.categories,
        data: categories,
        isLoading: false,
      },
    };
  }),
  on(ProductStoreActions.fetchCategoriesError, (state, { error }) => {
    return {
      ...state,
      categories: {
        ...state.categories,
        data: undefined,
        error,
        isLoading: false,
      },
    };
  }),
  on(ProductStoreActions.viewDestroyed, state => {
    return {
      ...state,
      viewDestroyed: true,
    };
  }),
  on(ProductStoreActions.resetState, () => {
    return {
      ...initialState,
    };
  })
);
