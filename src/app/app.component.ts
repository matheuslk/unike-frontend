import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IJWT } from './core/data/interfaces/jwt.interface';
import { LocalStorageService } from './core/services/local-storage.service';
import { SidenavService } from './core/services/sidenav.service';
import { SvgIconsService } from './core/services/svg-icons.service';
import { AuthFacade } from './core/state/auth/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild('menuSidenav')
  menuSidenav!: MatSidenav;
  @ViewChild('productFilterSidenav')
  productFilterSidenav!: MatSidenav;

  showMenuSidenav!: Observable<boolean>;
  showProductFilterSidenav!: Observable<boolean>;

  constructor(
    public authFacade: AuthFacade,
    private sidenavService: SidenavService,
    private svgIconsService: SvgIconsService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  ngAfterViewInit(): void {
    this.sidenavService.setMenuSidenav(this.menuSidenav);
    this.sidenavService.setProductFilterSidenav(this.productFilterSidenav);
  }

  initData(): void {
    this.registerSvgIcons();
    this.checkIfIsAuthenticated();
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

  redirectToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
