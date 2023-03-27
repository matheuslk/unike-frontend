import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSelectionList } from '@angular/material/list';
import { Router } from '@angular/router';
import { Observable, Subject, merge } from 'rxjs';
import { skip, take, takeUntil } from 'rxjs/operators';
import { ERROR_MESSAGES } from 'src/app/core/data/enums/error-messages.enum';
import { INGRXData } from 'src/app/core/data/interfaces/ngrx-data.interface';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import {
  IFiltersResponse,
  ISearchFilters,
} from '../../data/interfaces/product-filter.interface';
import { IFilteredProductResponse } from '../../data/interfaces/product.interface';
import { ProductListFacade } from '../../state/product-list/product-list.facade';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  viewDestroyed$!: Subject<void>;

  products$!: Observable<INGRXData<IFilteredProductResponse[]>>;
  filters$!: Observable<INGRXData<IFiltersResponse>>;
  searchFilters$!: Observable<ISearchFilters>;

  productsErrorMessage?: string;

  @ViewChild('categoriesFilterList')
  categoriesFilterList!: MatSelectionList;
  @ViewChild('sizesFilterList')
  sizesFilterList!: MatSelectionList;

  constructor(
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
    this.products$ = this.productListFacade
      .selectProducts$()
      .pipe(takeUntil(this.viewDestroyed$));
    this.filters$ = this.productListFacade
      .selectFilters$()
      .pipe(takeUntil(this.viewDestroyed$));
    this.searchFilters$ = this.productListFacade
      .selectSearchFilters$()
      .pipe(takeUntil(this.viewDestroyed$));
  }

  setListeners(): void {
    this.setProductsErrorListener();
    this.setProductSearchFiltersListener();
  }

  setProductsErrorListener(): void {
    this.products$.subscribe(products => {
      this.productsErrorMessage = products.error
        ? products.error.message
        : products.data?.length === 0
        ? ERROR_MESSAGES.EMPTY_LIST
        : '';
    });
  }

  setProductSearchFiltersListener(): void {
    merge(this.searchFilters$.pipe(take(1)), this.searchFilters$.pipe(skip(1)))
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe(filters => {
        console.log(`PRODUCT LIST - SEARCH FILTERS`);
        this.productListFacade.fetchProducts(filters);
      });
  }

  fetchData(): void {
    this.productListFacade.fetchFilters();
  }

  showSearchFilterSidenav(): void {
    this.sidenavService.toggleProductFilterSidenav();
  }

  redirectToProduct(id: number): void {
    this.router.navigateByUrl(`/products/${id}`);
  }

  redirectToProductStore(): void {
    this.router.navigateByUrl('products/store');
  }
}
