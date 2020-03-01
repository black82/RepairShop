import {Client} from './ClientWeb';

export class PrintEntity {
  client_print: Client;
  type_client_print: number;
  date_exit_device: Date;


  constructor(client_print: Client, type_client_print: number, date_exit_device?: Date) {
    this.client_print = client_print;
    this.type_client_print = type_client_print;
    this.date_exit_device = date_exit_device;
  }
}
