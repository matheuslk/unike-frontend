import { createAction, props } from '@ngrx/store';
import { ISearchFilters } from '../../data/interfaces/product-filter.interface';
import {
  ICategory,
  IFilteredProductResponse,
} from '../../data/interfaces/product.interface';
import { HttpError } from 'src/app/shared/data/models/http-error.model';

export const fetchProducts = createAction(
  '[Product - List] Fetch Products',
  props<{ filters: ISearchFilters }>()
);

export const fetchProductsSuccess = createAction(
  '[Product - List] Fetch Products Success',
  props<{ products: IFilteredProductResponse[] }>()
);

export const fetchProductsError = createAction(
  '[Product - List] Fetch Products Error',
  props<{ error: HttpError }>()
);

export const fetchFilters = createAction('[Product - List] Fetch Filters');

export const fetchFiltersSuccess = createAction(
  '[Product - List] Fetch Filters Success',
  props<{ filters: ICategory[] }>()
);

export const fetchFiltersError = createAction(
  '[Product - List] Fetch Filters Error',
  props<{ error: HttpError }>()
);

export const setSearchFilters = createAction(
  '[Product - List] Set Search Filters',
  props<{ filters: Partial<ISearchFilters> }>()
);
