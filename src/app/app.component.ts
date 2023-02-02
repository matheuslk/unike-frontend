import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IJWT } from './core/data/interfaces/jwt.interface';
import { LocalStorageService } from './core/services/local-storage.service';
import { SidenavService } from './core/services/sidenav.service';
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
    private authFacade: AuthFacade,
    private sidenavService: SidenavService,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit(): void {
    this.checkIfIsAuthenticated();
  }

  ngAfterViewInit(): void {
    this.sidenavService.setMenuSidenav(this.menuSidenav);
    this.sidenavService.setProductFilterSidenav(this.productFilterSidenav);
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
}
