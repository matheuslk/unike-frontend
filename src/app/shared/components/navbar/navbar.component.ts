import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { ProductListFacade } from 'src/app/features/products/state/product-list/product-list.facade';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
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

  initData(): void {
    this.viewDestroyed$ = new Subject();
    this.showSearchInput = this.router.url === '/home' ? true : false;
    this.searchControl = new FormControl('');
  }

  setListeners(): void {
    this.setSearchListener();
  }

  setSearchListener(): void {
    this.searchControl.valueChanges
      .pipe(debounceTime(300), takeUntil(this.viewDestroyed$))
      .subscribe((search: string) => {
        this.productListFacade.setProductFilter({ name: search });
      });
  }
}
