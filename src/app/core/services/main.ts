import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Main {
  private sidebarVisibleSubject: BehaviorSubject<boolean>;
  public sidebarVisible$: Observable<boolean>;

  constructor() {
    // Initialize based on screen size: true for large screens, false for small
    const isLargeScreen = window.innerWidth >= 992;
    this.sidebarVisibleSubject = new BehaviorSubject<boolean>(isLargeScreen);
    this.sidebarVisible$ = this.sidebarVisibleSubject.asObservable();
  }

  toggleSidebar(): void {
    this.sidebarVisibleSubject.next(!this.sidebarVisibleSubject.value);
  }

  setSidebarState(visible: boolean): void {
    this.sidebarVisibleSubject.next(visible);
  }

  getSidebarState(): boolean {
    return this.sidebarVisibleSubject.value;
  }
}
