import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { IProductResponse } from '../../data/interfaces/product.interface';

import * as ProductActions from './product.actions';
import * as ProductSelectors from './product.selectors';
import { INGRXData } from 'src/app/shared/data/interfaces/ngrx-data.interface';

@Injectable()
export class ProductFacade {
  constructor(private store: Store) {}

  findProduct(id: string): void {
    this.store.dispatch(ProductActions.findProduct({ id }));
  }

  selectProduct$(): Observable<INGRXData<IProductResponse>> {
    return this.store.select(ProductSelectors.selectProduct);
  }
}
