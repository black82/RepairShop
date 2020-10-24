import {EventEmitter, Injectable, Output} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {DeviceForSale} from '../entity/DeviceForSale';
import {DeviceForSaleTransaction} from '../entity/DeviceForSaleTransaction';

@Injectable({
  providedIn: 'root'
})
export class DeviceInputService {
  @Output()
  $client_push: EventEmitter<Client> = new EventEmitter();

  $deviceForSaleClient: EventEmitter<DeviceForSale> = new EventEmitter();

  $deviceForSaleClientTransaction: EventEmitter<DeviceForSaleTransaction> = new EventEmitter();

  constructor() {
  }
}
