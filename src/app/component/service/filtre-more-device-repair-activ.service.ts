import {EventEmitter, Injectable, Output} from '@angular/core';
import {Device} from '../entity/Device';

@Injectable({
  providedIn: 'root'
})
export class FiltreMoreDeviceRepairActivService {
  @Output()
  device_check: EventEmitter<Device[]> = new EventEmitter<Device[]>();


  constructor() {
  }

  device_select(devices: Device[]) {
    this.device_check.emit(devices);
  }
}
