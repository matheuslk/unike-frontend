import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { HttpError } from 'src/app/core/data/models/http-error.model';
import { ProductService } from '../../data/services/product.service';
import * as ProductListActions from './product-list.actions';

@Injectable()
export class ProductListEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}

  fetchProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductListActions.fetchProducts),
      switchMap(({ filter }) => {
        return this.productService.filter(filter).pipe(
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

  fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductListActions.fetchCategories),
      switchMap(() => {
        return this.productService.fetchCategories().pipe(
          switchMap(categories =>
            of(ProductListActions.fetchCategoriesSuccess({ categories }))
          ),
          catchError((error: HttpError) =>
            of(ProductListActions.fetchCategoriesError({ error }))
          )
        );
      })
    )
  );
}
