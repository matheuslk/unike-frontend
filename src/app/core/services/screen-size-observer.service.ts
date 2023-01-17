import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable, skip } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeObserverService {
  currentScreenSize!: BehaviorSubject<number>;
  constructor() {
    this.initData();
    this.setListeners();
  }

  getCurrentScreenSize(): Observable<number> {
    return this.currentScreenSize.asObservable();
  }

  private initData(): void {
    this.currentScreenSize = new BehaviorSubject(window.innerWidth);
  }

  private setListeners(): void {
    this.setScreenSizeListener();
  }

  private setScreenSizeListener(): void {
    fromEvent(window, 'resize')
      .pipe(skip(1))
      .subscribe(() => {
        this.currentScreenSize.next(window.innerWidth);
      });
  }
}
