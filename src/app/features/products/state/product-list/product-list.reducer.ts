import { Action, ActionReducer, createReducer, on } from '@ngrx/store';
import { ISearchFilters } from '../../data/interfaces/product-filter.interface';
import {
  ICategory,
  IFilteredProductResponse,
} from '../../data/interfaces/product.interface';
import * as ProductListActions from './product-list.actions';
import { INGRXData } from 'src/app/shared/data/interfaces/ngrx-data.interface';

export interface ProductListState {
  products: INGRXData<IFilteredProductResponse[]>;
  filters: INGRXData<ICategory[]>;
  searchFilters: ISearchFilters;
}

export const productListFeatureKey = 'product-list';

const initialState: ProductListState = {
  products: {
    data: undefined,
    error: undefined,
    isLoading: false,
  },
  filters: {
    data: undefined,
    error: undefined,
    isLoading: false,
  },
  searchFilters: {
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
  on(ProductListActions.fetchFilters, state => {
    return {
      ...state,
      filters: {
        ...state.filters,
        error: undefined,
        isLoading: true,
      },
    };
  }),
  on(ProductListActions.fetchFiltersSuccess, (state, { filters }) => {
    return {
      ...state,
      filters: {
        ...state.filters,
        data: filters,
        isLoading: false,
      },
    };
  }),
  on(ProductListActions.fetchFiltersError, (state, { error }) => {
    return {
      ...state,
      categories: {
        ...state.filters,
        data: undefined,
        error,
        isLoading: false,
      },
    };
  }),
  on(ProductListActions.setSearchFilters, (state, { filters }) => {
    return {
      ...state,
      searchFilters: {
        ...state.searchFilters,
        name: filters.name ?? state.searchFilters.name,
        categories: filters.categories ?? state.searchFilters.categories,
      },
    };
  })
);
