import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';
import { IFindProductResponse } from '../../data/interfaces/product.interface';

import * as ProductActions from './product.actions';
import * as ProductSelectors from './product.selectors';

@Injectable()
export class ProductFacade {
  constructor(private store: Store) {}

  findProduct(id: string): void {
    this.store.dispatch(ProductActions.findProduct({ id }));
  }

  selectProduct$(): Observable<INGRXData<IFindProductResponse>> {
    return this.store.select(ProductSelectors.selectProduct);
  }
}
