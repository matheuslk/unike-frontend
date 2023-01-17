import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { map, take, takeUntil } from 'rxjs/operators';
import { ScreenSizeObserverService } from 'src/app/core/services/screen-size-observer.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentScreenSize!: Observable<number>;
  expandNavbar!: BehaviorSubject<boolean>;
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
    this.expandNavbar = new BehaviorSubject(false);
  }

  shouldExpandNavbar(): boolean {
    return this.expandNavbar.getValue();
  }

  shouldEnableExpandNavbar(): Observable<boolean> {
    return this.currentScreenSize.pipe(
      map((screenSize) => screenSize < 992),
      take(1)
    );
  }
}
