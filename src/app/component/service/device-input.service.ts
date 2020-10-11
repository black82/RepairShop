import {EventEmitter, Injectable, Output} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {DeviceForSale} from '../entity/DeviceForSale';

@Injectable({
  providedIn: 'root'
})
export class DeviceInputService {
  @Output()
  $client_push: EventEmitter<Client> = new EventEmitter();

  $deviceForSaleClient: EventEmitter<DeviceForSale> = new EventEmitter();

  constructor() {
  }
}
