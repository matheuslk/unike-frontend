import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { distinctUntilChanged } from 'rxjs/operators';
import * as SidenavActions from './sidenav.actions';
import * as SidenavSelectors from './sidenav.selectors';

@Injectable({
  providedIn: 'root',
})
export class SidenavFacade {
  constructor(private store: Store) {}

  toggleSidenav() {
    this.store.dispatch(SidenavActions.toggleSidenav());
  }

  selectIsOpened$() {
    return this.store
      .select(SidenavSelectors.selectIsOpened)
      .pipe(distinctUntilChanged());
  }
}
