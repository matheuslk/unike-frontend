import { Injectable } from '@angular/core';
import { BehaviorSubject, fromEvent, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ScreenSizeObserverService {
  currentScreenSize!: BehaviorSubject<number>;
  constructor() {
    this.currentScreenSize = new BehaviorSubject(window.innerWidth);
    this.setScreenSizeListener();
  }

  getCurrentScreenSize(): Observable<number> {
    return this.currentScreenSize.asObservable();
  }

  private setScreenSizeListener(): void {
    fromEvent(window, 'resize').subscribe(() => {
      this.currentScreenSize.next(window.innerWidth);
    });
  }
}
