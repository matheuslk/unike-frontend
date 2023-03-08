import { createAction, props } from '@ngrx/store';
import { HttpError } from 'src/app/core/data/models/http-error.model';
import { ICategory } from '../../data/interfaces/category.interface';
import { IProductFilter } from '../../data/interfaces/product-filter.interface';
import { IFetchProductsResponse } from '../../data/interfaces/product.interface';

export const fetchProducts = createAction(
  '[Product - List] Fetch Products',
  props<{ filter: IProductFilter }>()
);

export const fetchProductsSuccess = createAction(
  '[Product - List] Fetch Products Success',
  props<{ products: IFetchProductsResponse[] }>()
);

export const fetchProductsError = createAction(
  '[Product - List] Fetch Products Error',
  props<{ error: HttpError }>()
);

export const fetchCategories = createAction(
  '[Product - List] Fetch Categories'
);

export const fetchCategoriesSuccess = createAction(
  '[Product - List] Fetch Categories Success',
  props<{ categories: ICategory[] }>()
);

export const fetchCategoriesError = createAction(
  '[Product - List] Fetch Categories Error',
  props<{ error: HttpError }>()
);

export const setProductFilter = createAction(
  '[Product - List] Set Product Filter',
  props<{ filter: IProductFilter }>()
);
