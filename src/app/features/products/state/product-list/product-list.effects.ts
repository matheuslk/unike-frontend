import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import * as ProductListActions from './product-list.actions';
import { HttpError } from 'src/app/shared/data/models/http-error.model';
import { ProductService } from '../../data/services/product.service';

@Injectable()
export class ProductListEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductListActions.fetchProducts),
      switchMap(({ filters }) => {
        return this.productService.filter(filters).pipe(
          switchMap(products =>
            of(ProductListActions.fetchProductsSuccess({ products }))
          ),
          catchError((error: HttpError) =>
            of(ProductListActions.fetchProductsError({ error }))
          )
        );
      })
    )
  );

  fetchFilters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductListActions.fetchFilters),
      switchMap(() => {
        return this.productService.fetchCategories().pipe(
          switchMap(filters =>
            of(ProductListActions.fetchFiltersSuccess({ filters }))
          ),
          catchError((error: HttpError) =>
            of(ProductListActions.fetchFiltersError({ error }))
          )
        );
      })
    )
  );
}
