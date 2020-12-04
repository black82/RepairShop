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

  $client_pushArray: EventEmitter<Client[]> = new EventEmitter();

  $deviceForSaleClient: EventEmitter<DeviceForSale> = new EventEmitter();

  $deviceForSaleClientTransaction: EventEmitter<DeviceForSaleTransaction> = new EventEmitter();

  $deviceForSaleClientTransactionArray: EventEmitter<DeviceForSaleTransaction[]> = new EventEmitter();

  $clientRedactEvent: EventEmitter<Client> = new EventEmitter();

  $clientRepairIdByRedact: EventEmitter<number> = new EventEmitter();

  $clientAfterRedact: EventEmitter<Client> = new EventEmitter();

  constructor() {
  }
}
