import {Client} from './ClientWeb';
import {DeviceForSale} from './DeviceForSale';

export class DeviceForSaleDto {
  clientBaying: Client;
  clientSailing: Client;
  deviceForSale: DeviceForSale;

  constructor(clientBaying: Client, clientSailing: Client, deviceForSale: DeviceForSale) {
    this.clientBaying = clientBaying;
    this.clientSailing = clientSailing;
    this.deviceForSale = deviceForSale;
  }
}
