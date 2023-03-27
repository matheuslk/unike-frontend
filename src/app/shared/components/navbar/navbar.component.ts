import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Subject } from 'rxjs';
import { distinctUntilChanged, skip, takeUntil, tap } from 'rxjs/operators';
import { ProductListFacade } from 'src/app/features/products/state/product-list/product-list.facade';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  viewDestroyed$!: Subject<void>;
  searchControl!: FormControl;
  showSearchInput!: boolean;
  constructor(
    private productListFacade: ProductListFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
    this.setListeners();
  }

  ngOnDestroy(): void {
    this.viewDestroyed$.next();
    this.viewDestroyed$.complete();
  }

  initData(): void {
    this.viewDestroyed$ = new Subject();
    this.showSearchInput = this.router.url === '/home' ? true : false;
    this.searchControl = new FormControl('');
  }

  setListeners(): void {
    this.setProductFiltersErrorListener();
    this.setSearchListener();
  }

  setProductFiltersErrorListener(): void {
    if (!this.showSearchInput) {
      return;
    }
    this.productListFacade
      .selectFilters$()
      .pipe(takeUntil(this.viewDestroyed$))
      .subscribe(filters => {
        filters.error || filters.isLoading
          ? this.searchControl.disable()
          : this.searchControl.enable();
      });
  }

  setSearchListener(): void {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        skip(1),
        takeUntil(this.viewDestroyed$)
      )
      .subscribe((search: string) => {
        this.productListFacade.setSearchFilters({
          name: search,
        });
      });
  }
}
