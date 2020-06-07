import {EventEmitter, Injectable, OnDestroy, Output} from '@angular/core';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SigPadService implements OnDestroy {
  @Output()
  open$ = new EventEmitter();
  @Output()
  image_sig_ad: EventEmitter<string> = new EventEmitter<string>();
  image_sig: string[] = [];
  private image_event: Subscription;

  constructor() {
    this.add_image_event();
  }

  add_image_event() {
    this.image_event = this.image_sig_ad.subscribe(image => {
      this.image_sig.push(image);
    });
  }

  ngOnDestroy(): void {
    this.image_event.unsubscribe();
  }
}
