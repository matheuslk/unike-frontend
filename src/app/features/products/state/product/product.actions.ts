import { createAction, props } from '@ngrx/store';
import { IProductResponse } from '../../data/interfaces/product.interface';
import { HttpError } from 'src/app/shared/data/models/http-error.model';

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
