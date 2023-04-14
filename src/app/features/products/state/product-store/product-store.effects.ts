import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, switchMap, takeUntil, tap } from 'rxjs/operators';
import * as ProductStoreActions from './product-store.actions';
import { ProductStoreFacade } from './product-store.facade';
import { HttpError } from 'src/app/shared/data/models/http-error.model';
import { ProductService } from '../../data/services/product.service';

@Injectable()
export class ProductStoreEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private productStoreFacade: ProductStoreFacade
  ) {}

  storeProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductStoreActions.storeProduct),
      switchMap(({ body }) => {
        return this.productService.store(body).pipe(
          switchMap(product =>
            of(ProductStoreActions.storeProductSuccess({ product }))
          ),
          catchError((error: HttpError) =>
            of(ProductStoreActions.storeProductError({ error }))
          )
        );
      })
    )
  );

  fetchCategories$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProductStoreActions.fetchCategories),
      switchMap(() => {
        return this.productService.fetchCategories().pipe(
          switchMap(categories =>
            of(ProductStoreActions.fetchCategoriesSuccess({ categories }))
          ),
          catchError((error: HttpError) =>
            of(ProductStoreActions.fetchCategoriesError({ error }))
          ),
          takeUntil(this.productStoreFacade.selectViewDestroyed$())
        );
      })
    )
  );

  viewDestroyed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProductStoreActions.viewDestroyed),
        tap(() => {
          this.productStoreFacade.resetState();
        })
      ),
    {
      dispatch: false,
    }
  );
}
