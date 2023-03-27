import { Injectable } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private menuSidenav!: MatSidenav;
  private productFilterSidenav!: MatSidenav;
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

  getIsProductFilterSidenavOpened(): boolean {
    return this.productFilterSidenav.opened;
  }
}
