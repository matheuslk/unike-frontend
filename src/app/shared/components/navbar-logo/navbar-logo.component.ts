import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar-logo',
  templateUrl: './navbar-logo.component.html',
  styleUrls: ['./navbar-logo.component.scss'],
})
export class NavbarLogoComponent {
  constructor(private router: Router) {}

  redirectToHome(): void {
    this.router.navigateByUrl('/home');
  }
}
