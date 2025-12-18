import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoaderService {
  private _loading = signal(false);
  public readonly loading = this._loading.asReadonly();

  private activeRequests = 0;

  show() {
    this.activeRequests++;
    this._loading.set(true);
  }

  hide() {
    this.activeRequests--;
    if (this.activeRequests <= 0) {
      this._loading.set(false);
      this.activeRequests = 0;
    }
  }
}
