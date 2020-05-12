import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SigPadService {
  @Output()
  open$ = new EventEmitter();
  @Output()
  image_sig_ad: EventEmitter<string> = new EventEmitter<string>();
  image_sig: string[] = [];

  constructor() {
    this.add_image_event();
  }

  add_image_event() {
    this.image_sig_ad.subscribe(image => {
      this.image_sig.push(image);
    });
  }
}
