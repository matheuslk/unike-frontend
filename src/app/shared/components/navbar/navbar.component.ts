import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SidenavService } from 'src/app/core/services/sidenav.service';
import { AuthFacade } from 'src/app/core/state/auth/auth.facade';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(
    private sidenavService: SidenavService,
    public authFacade: AuthFacade,
    private router: Router
  ) {}

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
