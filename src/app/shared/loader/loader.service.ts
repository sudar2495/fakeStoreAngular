import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class LoaderService {
  isLoading = new BehaviorSubject<boolean>(false);
  loaderState$ = this.isLoading.asObservable();

  constructor() { }

  show() {
    this.isLoading.next(<any>{ show: true });
  }

  hide() {
      this.isLoading.next(<any>{ show: false });
  }
}
