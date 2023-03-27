import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import {
  MatSelectionList,
  MatSelectionListChange,
} from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IJWT } from './core/data/interfaces/jwt.interface';
import { INGRXData } from './core/data/interfaces/ngrx-data.interface';
import { LocalStorageService } from './core/services/local-storage.service';
import { SidenavService } from './core/services/sidenav.service';
import { SvgIconsService } from './core/services/svg-icons.service';
import { AuthFacade } from './core/state/auth/auth.facade';
import {
  IFiltersResponse,
  ISearchFilters,
} from './features/products/data/interfaces/product-filter.interface';
import { ProductListFacade } from './features/products/state/product-list/product-list.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  showProductFilterSizes!: boolean;

  productFilters$!: Observable<INGRXData<IFiltersResponse>>;
  productSearchFilters$!: Observable<ISearchFilters>;

  @ViewChild('menuSidenav')
  menuSidenav!: MatSidenav;
  @ViewChild('productFilterSidenav')
  productFilterSidenav!: MatSidenav;

  @ViewChild('categoriesFilterList')
  categoriesFilterList!: MatSelectionList;
  @ViewChild('sizesFilterList')
  sizesFilterList!: MatSelectionList;

  constructor(
    private sidenavService: SidenavService,
    private svgIconsService: SvgIconsService,
    private localStorageService: LocalStorageService,
    public authFacade: AuthFacade,
    private productListFacade: ProductListFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
    this.setListeners();
  }

  ngAfterViewInit(): void {
    this.sidenavService.setMenuSidenav(this.menuSidenav);
    this.sidenavService.setProductFilterSidenav(this.productFilterSidenav);
  }

  initData(): void {
    this.registerSvgIcons();
    this.checkIfIsAuthenticated();
    this.productFilters$ = this.productListFacade.selectFilters$();
    this.productSearchFilters$ = this.productListFacade.selectSearchFilters$();
    this.showProductFilterSizes = false;
  }

  setListeners(): void {
    this.setProductSearchFiltersListener();
  }

  setProductSearchFiltersListener(): void {
    this.productSearchFilters$.subscribe(filters => {
      this.showProductFilterSizes = filters.categories.includes('1')
        ? true
        : false;
    });
  }

  checkIfIsAuthenticated(): void {
    const jwt = this.localStorageService.get<IJWT>(environment.JWT_KEY);
    if (!jwt) {
      this.authFacade.setIsAuthenticated(false);
      return;
    }
    this.authFacade.setJWT(jwt);
    this.authFacade.check();
  }

  registerSvgIcons(): void {
    this.svgIconsService.register();
  }

  handleFilterOnChange(
    event: MatSelectionListChange,
    list: 'categories' | 'sizes'
  ): void {
    console.log('HANDLE FILTER ON CHANGE', event.source._value);
    let filters: Partial<ISearchFilters> = {
      [list]: event.source._value ? event.source._value : [],
    };
    // DELETE SIZES IF CATEGORY EQUALS '1'
    if (list === 'categories' && !event.source._value?.includes('1')) {
      filters.sizes = [];
    }
    this.productListFacade.setSearchFilters(filters);
  }

  redirectToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
