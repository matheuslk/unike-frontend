import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil, tap } from 'rxjs/operators';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';
import { ScreenSizeObserverService } from 'src/app/core/services/screen-size-observer.service';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { ICategory } from '../../data/interfaces/category.interface';
import { IProductFilter } from '../../data/interfaces/product-filter.interface';
import { IFetchProductsResponse } from '../../data/interfaces/product.interface';
import { ProductListFacade } from '../../state/product-list/product-list.facade';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  viewDestroyed$!: Subject<void>;
  currentScreenSize$!: Observable<number>;

  products$!: Observable<INGRXData<IFetchProductsResponse[]>>;
  categories$!: Observable<INGRXData<ICategory[]>>;
  filter$!: Observable<IProductFilter>;

  constructor(
    private screenSizeObserverService: ScreenSizeObserverService,
    private sidenavService: SidenavService,
    private productListFacade: ProductListFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
    this.setListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.viewDestroyed$.next();
    this.viewDestroyed$.unsubscribe();
  }

  initData(): void {
    this.viewDestroyed$ = new Subject();
    this.currentScreenSize$ = this.screenSizeObserverService
      .getCurrentScreenSize()
      .pipe(takeUntil(this.viewDestroyed$));
    this.products$ = this.productListFacade
      .selectProducts$()
      .pipe(takeUntil(this.viewDestroyed$));
    this.categories$ = this.productListFacade
      .selectCategories$()
      .pipe(takeUntil(this.viewDestroyed$));
    this.filter$ = this.productListFacade
      .selectFilter$()
      .pipe(takeUntil(this.viewDestroyed$));
  }

  setListeners(): void {
    this.setProductFilterListener();
  }

  setProductFilterListener(): void {
    this.filter$.subscribe(filter => {
      this.productListFacade.fetchProducts(filter);
    });
  }

  fetchData(): void {
    this.productListFacade.fetchCategories();
  }

  handleFilterOnChange(event: MatSelectionListChange): void {
    this.productListFacade.setProductFilter({
      categories: event.source._value ?? [],
    });
  }

  shouldShowFilterSidenav(): Observable<boolean> {
    return this.currentScreenSize$.pipe(
      map(screenSize => screenSize < 992),
      take(1)
    );
  }

  showFilterSidenav(): void {
    this.sidenavService.toggleProductFilterSidenav();
  }

  redirectToProductStore(): void {
    this.router.navigateByUrl('products/store');
  }
}
