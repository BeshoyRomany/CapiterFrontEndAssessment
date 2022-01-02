import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private count = 0;
  private loadingBehavior = new BehaviorSubject<string>('');
  constructor() {}

  getSpinnerObserver(): Observable<string> {
    return this.loadingBehavior.asObservable();
  }

  requestStarted() {
    if (++this.count === 1) {
      this.loadingBehavior.next('start');
    }
  }
  requestEnded() {
    if (this.count === 0 || --this.count === 0) {
      this.loadingBehavior.next('stop');
    }
  }

  resetLoadingBehavior() {
    this.count = 0;
    this.loadingBehavior.next('stop');
  }
}
