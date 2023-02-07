import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  constructor(private sidenavService: SidenavService, private router: Router) {}

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
