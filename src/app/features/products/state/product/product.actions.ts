import { createAction, props } from '@ngrx/store';
import { HttpError } from 'src/app/core/data/models/http-error.model';
import { IProductResponse } from '../../data/interfaces/product.interface';

export const findProduct = createAction(
  '[Product - Find] Fetch Product',
  props<{ id: string }>()
);

export const findProductSuccess = createAction(
  '[Product - Find] Fetch Products Success',
  props<{ product: IProductResponse }>()
);

export const findProductError = createAction(
  '[Product - Find] Fetch Product Error',
  props<{ error: HttpError }>()
);
