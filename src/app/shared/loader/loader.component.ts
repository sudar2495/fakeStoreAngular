import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import { LoaderService } from '../loader/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {

  isLoading = false;
  private subscription!: Subscription;

  constructor(private loaderService: LoaderService) {
  }

  ngOnInit(): void {
    this.subscription = this.loaderService.loaderState$.pipe(delay(0))
      .subscribe((state: any) => {
        setTimeout(() => {
          this.isLoading = state.show;
        }, 0)
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
