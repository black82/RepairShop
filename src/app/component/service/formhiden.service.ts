import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormhidenService {
  @Output()
  form_open: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  form_hide: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  id_repair: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }
}
