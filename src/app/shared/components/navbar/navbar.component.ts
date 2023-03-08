import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { debounceTime, Observable, Subject, takeUntil } from 'rxjs';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';
import { ProductListFacade } from 'src/app/features/products/state/product-list/product-list.facade';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  viewDestroyed$!: Subject<void>;
  isAuthenticated$!: Observable<boolean | undefined>;
  searchControl!: FormControl;
  constructor(
    private sidenavService: SidenavService,
    private authFacade: AuthFacade,
    private productListFacade: ProductListFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
    this.setListeners();
  }

  initData(): void {
    this.viewDestroyed$ = new Subject();
    this.isAuthenticated$ = this.authFacade.selectIsAuthenticated$();
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

  showSidenav(): void {
    this.sidenavService.toggleMenuSidenav();
  }

  redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }

  redirectToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
