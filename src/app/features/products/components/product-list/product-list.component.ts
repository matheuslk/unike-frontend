import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { ScreenSizeObserverService } from 'src/app/core/services/screen-size-observer.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  currentScreenSize!: Observable<number>;
  viewDestroyed!: Subject<void>;
  constructor(private screenSizeObserverService: ScreenSizeObserverService) {}

  ngOnInit(): void {
    this.initData();
  }

  initData(): void {
    this.viewDestroyed = new Subject();
    this.currentScreenSize = this.screenSizeObserverService
      .getCurrentScreenSize()
      .pipe(takeUntil(this.viewDestroyed));
  }

  shouldShowFilterSidenav(): Observable<boolean> {
    return this.currentScreenSize.pipe(
      map((screenSize) => screenSize < 992),
      take(1)
    );
  }
}
