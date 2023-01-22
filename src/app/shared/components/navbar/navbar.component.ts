import { Component, OnInit } from '@angular/core';
import { SidenavFacade } from 'src/app/core/state/sidenav/sidenav.facade';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(private sidenavFacade: SidenavFacade) {}

  ngOnInit(): void {}

  showSidenav() {
    this.sidenavFacade.toggleSidenav();
  }
}
