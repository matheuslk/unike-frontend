import { createAction, props } from '@ngrx/store';
import {
  ICategory,
  IProduct,
  IProductFormBody,
} from '../../data/interfaces/product.interface';
import { HttpError } from 'src/app/shared/data/models/http-error.model';

export const storeProduct = createAction(
  '[Product - Store] Store Product',
  props<{ body: IProductFormBody }>()
);

export const storeProductSuccess = createAction(
  '[Product - Store] Store Product Success',
  props<{ product: IProduct }>()
);

export const storeProductError = createAction(
  '[Product - Store] Store Product Error',
  props<{ error: HttpError }>()
);

export const fetchCategories = createAction(
  '[Product - Store] Fetch Categories'
);

export const fetchCategoriesSuccess = createAction(
  '[Product - Store] Fetch Categories Success',
  props<{ categories: ICategory[] }>()
);

export const fetchCategoriesError = createAction(
  '[Product - Store] Fetch Categories Error',
  props<{ error: HttpError }>()
);

export const viewDestroyed = createAction('[Product - Store] View Destroyed');

export const resetState = createAction('[Product - Store] Reset State');
