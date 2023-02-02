import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { ScreenSizeObserverService } from 'src/app/core/services/screen-size-observer.service';
import { SidenavService } from 'src/app/core/services/sidenav.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit, OnDestroy {
  currentScreenSize!: Observable<number>;
  viewDestroyed!: Subject<void>;
  constructor(
    private screenSizeObserverService: ScreenSizeObserverService,
    private sidenavService: SidenavService
  ) {}

  ngOnInit(): void {
    this.initData();
  }

  ngOnDestroy(): void {
    this.viewDestroyed.next();
    this.viewDestroyed.unsubscribe();
  }

  initData(): void {
    this.viewDestroyed = new Subject();
    this.currentScreenSize = this.screenSizeObserverService
      .getCurrentScreenSize()
      .pipe(takeUntil(this.viewDestroyed));
  }

  shouldShowFilterSidenav(): Observable<boolean> {
    return this.currentScreenSize.pipe(
      map(screenSize => screenSize < 992),
      take(1)
    );
  }

  showFilterSidenav(): void {
    this.sidenavService.toggleProductFilterSidenav();
  }
}
