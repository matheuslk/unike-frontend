import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { skip, filter } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { SidenavFacade } from './core/state/sidenav/sidenav.facade';
import { ProductListFacade } from './features/products/state/product-list/product-list.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('menuSidenav')
  menuSidenav!: MatSidenav;
  @ViewChild('productFilterSidenav')
  productFilterSidenav!: MatSidenav;

  showMenuSidenav!: Observable<boolean>;
  showProductFilterSidenav!: Observable<boolean>;

  constructor(
    private menuSidenavFacade: SidenavFacade,
    private productListFacade: ProductListFacade
  ) {}

  ngOnInit(): void {
    this.initData();
    this.setListeners();
  }

  initData(): void {
    this.showMenuSidenav = this.menuSidenavFacade.selectIsOpened$();
    this.showProductFilterSidenav =
      this.productListFacade.selectIsFilterSidenavOpened$();
  }

  setListeners(): void {
    this.setSidenavsListener();
  }

  setSidenavsListener(): void {
    this.showMenuSidenav
      .pipe(
        skip(1),
        filter(showSidenav => !!showSidenav)
      )
      .subscribe(() => {
        this.menuSidenav.toggle(true);
      });
    this.showProductFilterSidenav
      .pipe(
        skip(1),
        filter(showSidenav => !!showSidenav)
      )
      .subscribe(() => {
        this.productFilterSidenav.toggle(true);
      });
  }

  sidenavOpenedChange(opened: boolean, sidenav: string): void {
    if (opened) {
      return;
    }
    if (sidenav === 'MENU') {
      this.menuSidenavFacade.toggleSidenav();
    } else if (sidenav === 'PRODUCT-FILTER') {
      this.productListFacade.toggleFilterSidenav();
    }
  }
}
