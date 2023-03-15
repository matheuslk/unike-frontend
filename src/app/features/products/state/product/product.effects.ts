import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpError } from 'src/app/core/data/models/http-error.model';
import { ProductService } from '../../data/services/product.service';
import * as ProductActions from './product.actions';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  findProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductActions.findProduct),
      switchMap(({ id }) => {
        return this.productService.find(id).pipe(
          switchMap(product =>
            of(ProductActions.findProductSuccess({ product }))
          ),
          catchError((error: HttpError) =>
            of(ProductActions.findProductError({ error }))
          )
        );
      })
    )
  );
}
