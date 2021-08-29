import {Client} from './ClientWeb';
import {PreOrderShop} from './PreOrderShop';

export class PreOrderDto {
  client: Client;
  preOrderShop: PreOrderShop;

  constructor(client: Client, preOrderShop: PreOrderShop) {
    this.client = client;
    this.preOrderShop = preOrderShop;
  }
}
