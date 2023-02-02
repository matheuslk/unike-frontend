import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  menuSidenav!: MatSidenav;
  productFilterSidenav!: MatSidenav;
  constructor() {}

  setMenuSidenav(sidenav: MatSidenav): void {
    this.menuSidenav = sidenav;
  }

  setProductFilterSidenav(sidenav: MatSidenav): void {
    this.productFilterSidenav = sidenav;
  }

  toggleMenuSidenav(): void {
    this.menuSidenav.toggle();
  }

  toggleProductFilterSidenav(): void {
    this.productFilterSidenav.toggle();
  }
}
