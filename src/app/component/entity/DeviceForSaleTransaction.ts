import {Client} from './ClientWeb';
import {DeviceForSale} from './DeviceForSale';

export class DeviceForSaleTransaction {
  deviceForSaleTransactionId: number;
  clientBaying: Client;
  clientSailing: Client;
  deviceForSale: DeviceForSale;


  constructor(deviceForSaleTransactionId: number, clientBaying: Client, clientSailing: Client, deviceForSale: DeviceForSale) {
    this.deviceForSaleTransactionId = deviceForSaleTransactionId;
    this.clientBaying = clientBaying;
    this.clientSailing = clientSailing;
    this.deviceForSale = deviceForSale;
  }
}
