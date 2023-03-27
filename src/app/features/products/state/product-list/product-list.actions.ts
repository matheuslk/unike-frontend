import { createAction, props } from '@ngrx/store';
import { HttpError } from 'src/app/core/data/models/http-error.model';
import {
  IFiltersResponse,
  ISearchFilters,
} from '../../data/interfaces/product-filter.interface';
import { IFilteredProductResponse } from '../../data/interfaces/product.interface';

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
  props<{ filters: IFiltersResponse }>()
);

export const fetchFiltersError = createAction(
  '[Product - List] Fetch Filters Error',
  props<{ error: HttpError }>()
);

export const setSearchFilters = createAction(
  '[Product - List] Set Search Filters',
  props<{ filters: Partial<ISearchFilters> }>()
);
