import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  @Output()
  $admin_show: EventEmitter<any> = new EventEmitter();

  constructor() {
  }
}
