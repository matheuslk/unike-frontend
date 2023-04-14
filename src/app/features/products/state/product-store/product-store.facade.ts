import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import {
  ICategory,
  IProduct,
  IProductFormBody,
} from '../../data/interfaces/product.interface';
import * as ProductStoreSelectors from './product-store.selectors';
import * as ProductStoreActions from './product-store.actions';
import { INGRXData } from 'src/app/shared/data/interfaces/ngrx-data.interface';

@Injectable()
export class ProductStoreFacade {
  constructor(private store: Store) {}

  storeProduct(body: IProductFormBody): void {
    this.store.dispatch(ProductStoreActions.storeProduct({ body }));
  }

  fetchCategories(): void {
    this.store.dispatch(ProductStoreActions.fetchCategories());
  }

  selectProduct$(): Observable<INGRXData<IProduct>> {
    return this.store.select(ProductStoreSelectors.selectProduct);
  }

  selectCategories$(): Observable<INGRXData<ICategory[]>> {
    return this.store.select(ProductStoreSelectors.selectCategories);
  }

  selectViewDestroyed$(): Observable<boolean> {
    return this.store
      .select(ProductStoreSelectors.selectViewDestroyed)
      .pipe(filter(data => !!data));
  }

  viewDestroyed(): void {
    this.store.dispatch(ProductStoreActions.viewDestroyed());
  }

  resetState(): void {
    this.store.dispatch(ProductStoreActions.resetState());
  }
}
