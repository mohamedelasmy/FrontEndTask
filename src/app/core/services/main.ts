import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Main {
    private sidebarVisibleSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  public sidebarVisible$: Observable<boolean> = this.sidebarVisibleSubject.asObservable();

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
