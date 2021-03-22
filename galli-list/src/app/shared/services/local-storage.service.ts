import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  localStorage: Storage;

  changes$ = new Subject();

  constructor() {
    this.localStorage = window.localStorage;
  }

  get(key: string): Observable<any[]> {
    if (this.isLocalStorageSupported) {
      return of(JSON.parse(this.localStorage.getItem(key)));
    }
  }

  set(key: string, value: any): Observable<boolean> {
    if (this.isLocalStorageSupported) {
      this.localStorage.setItem(key, JSON.stringify(value));
      this.changes$.next({
        type: 'set',
        key,
        value
      });

      return of(true);
    }

    return of(false);
  }

  remove(key: string): Observable<boolean> {
    if (this.isLocalStorageSupported) {
      this.localStorage.removeItem(key);
      this.changes$.next({
        type: 'remove',
        key
      });

      return of(true);
    }

    return of(false);
  }

  get isLocalStorageSupported(): boolean {
    return !!this.localStorage;
  }
}
