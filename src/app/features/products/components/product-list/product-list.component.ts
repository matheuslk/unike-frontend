import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatSelectionListChange } from '@angular/material/list';
import { Router } from '@angular/router';
import { merge, Observable, Subject } from 'rxjs';
import { filter, map, skip, take, takeUntil } from 'rxjs/operators';
import { ERROR_MESSAGES } from 'src/app/core/data/enums/error-messages.enum';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';
import { ScreenSizeObserverService } from 'src/app/core/services/screen-size-observer.service';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { IProductFilter } from '../../data/interfaces/product-filter.interface';
import {
  ICategory,
  IFilterProductResponse,
} from '../../data/interfaces/product.interface';
import { ProductListFacade } from '../../state/product-list/product-list.facade';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  viewDestroyed$!: Subject<void>;
  currentScreenSize$!: Observable<number>;

  products$!: Observable<INGRXData<IFilterProductResponse[]>>;
  categories$!: Observable<INGRXData<ICategory[]>>;
  filter$!: Observable<IProductFilter>;

  productErrorMessage?: string;

  constructor(
    private screenSizeObserverService: ScreenSizeObserverService,
    private sidenavService: SidenavService,
    private productListFacade: ProductListFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
    this.setListeners();
    //IMPLEMENTAR LOAD DATA PARA VOLTAR COMO ERA ANTES -> CONTROLAR SCROLL DA TELA
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.viewDestroyed$.next();
    this.viewDestroyed$.complete();
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
    this.setProductsListener();
    this.setProductFilterListener();
  }

  setProductsListener(): void {
    this.products$.subscribe(products => {
      this.productErrorMessage = products.error
        ? products.error.message
        : products.data?.length === 0
        ? ERROR_MESSAGES.EMPTY_LIST
        : '';
    });
  }

  setProductFilterListener(): void {
    this.filter$.pipe(skip(1)).subscribe(filter => {
      this.productListFacade.fetchProducts(filter);
    });
  }

  fetchData(): void {
    this.productListFacade.fetchCategories();
    this.productListFacade.fetchProducts({});
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

  redirectToProduct(id: number): void {
    this.router.navigateByUrl(`/products/${id}`);
  }

  redirectToProductStore(): void {
    this.router.navigateByUrl('products/store');
  }
}
