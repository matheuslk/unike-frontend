import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { SidenavService } from 'src/app/core/data/services/sidenav.service';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';

@Component({
  selector: 'app-navbar-menu',
  templateUrl: './navbar-menu.component.html',
  styleUrls: ['./navbar-menu.component.scss'],
})
export class NavbarMenuComponent implements OnInit {
  isAuthenticated$!: Observable<boolean | undefined>;

  constructor(
    private sidenavService: SidenavService,
    private authFacade: AuthFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.isAuthenticated$ = this.authFacade
      .selectIsAuthenticated$()
      .pipe(take(1));
  }

  showSidenav(): void {
    this.sidenavService.toggleMenuSidenav();
  }

  redirectToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
