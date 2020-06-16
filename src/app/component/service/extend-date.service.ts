import {EventEmitter, Injectable, Output} from '@angular/core';
import {Repair} from '../entity/Repair';

@Injectable({
  providedIn: 'root'
})
export class ExtendDateService {
  @Output()
  $repair_extend_date_modal: EventEmitter<Repair> = new EventEmitter();

  constructor() {
  }
}
