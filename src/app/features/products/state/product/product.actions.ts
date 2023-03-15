import { createAction, props } from '@ngrx/store';
import { HttpError } from 'src/app/core/data/models/http-error.model';
import { IFindProductResponse } from '../../data/interfaces/product.interface';

export const findProduct = createAction(
  '[Product - Find] Fetch Product',
  props<{ id: string }>()
);

export const findProductSuccess = createAction(
  '[Product - Find] Fetch Products Success',
  props<{ product: IFindProductResponse }>()
);

export const findProductError = createAction(
  '[Product - Find] Fetch Product Error',
  props<{ error: HttpError }>()
);
