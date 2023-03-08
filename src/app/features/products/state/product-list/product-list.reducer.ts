import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';
import { ICategory } from '../../data/interfaces/category.interface';
import { IProductFilter } from '../../data/interfaces/product-filter.interface';
import { IFetchProductsResponse } from '../../data/interfaces/product.interface';
import * as ProductListActions from './product-list.actions';

export interface ProductListState {
  products: INGRXData<IFetchProductsResponse[]>;
  categories: INGRXData<ICategory[]>;
  filter: IProductFilter;
}

export const productListFeatureKey = 'product-list';

const initialState: ProductListState = {
  products: {
    data: undefined,
    error: undefined,
    isLoading: false,
  },
  categories: {
    data: undefined,
    error: undefined,
    isLoading: false,
  },
  filter: {
    name: '',
    categories: [],
  },
};

export const reducer: ActionReducer<ProductListState, Action> = createReducer(
  initialState,
  on(ProductListActions.fetchProducts, state => {
    return {
      ...state,
      products: {
        ...state.products,
        error: undefined,
        isLoading: true,
      },
    };
  }),
  on(ProductListActions.fetchProductsSuccess, (state, { products }) => {
    return {
      ...state,
      products: {
        ...state.products,
        data: products,
        isLoading: false,
      },
    };
  }),
  on(ProductListActions.fetchProductsError, (state, { error }) => {
    return {
      ...state,
      products: {
        ...state.products,
        data: undefined,
        error,
        isLoading: false,
      },
    };
  }),
  on(ProductListActions.fetchCategories, state => {
    return {
      ...state,
      categories: {
        ...state.categories,
        error: undefined,
        isLoading: true,
      },
    };
  }),
  on(ProductListActions.fetchCategoriesSuccess, (state, { categories }) => {
    return {
      ...state,
      categories: {
        ...state.categories,
        data: categories,
        isLoading: false,
      },
    };
  }),
  on(ProductListActions.fetchCategoriesError, (state, { error }) => {
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
  on(ProductListActions.setProductFilter, (state, { filter }) => {
    return {
      ...state,
      filter: {
        ...state.filter,
        name: filter.name ?? state.filter.name,
        categories: filter.categories ?? state.filter.categories,
      },
    };
  })
);
