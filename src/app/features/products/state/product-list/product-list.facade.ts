import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import * as ProductListActions from './product-list.actions';
import * as ProductListSelectors from './product-list.selectors';

@Injectable({
  providedIn: 'root',
})
export class ProductListFacade {
  constructor(private store: Store) {}

  toggleFilterSidenav() {
    this.store.dispatch(ProductListActions.toggleFilterSidenav());
  }

  selectIsFilterSidenavOpened$() {
    return this.store
      .select(ProductListSelectors.selectIsFilterSidenavOpened)
      .pipe(distinctUntilChanged());
  }
}
