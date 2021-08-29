import {Client} from './ClientWeb';
import {PreOrderDto} from './PreOrderDto';

export class PrintEntity {
  client_print: Client;
  type_client_print: number;
  date_exit_device: Date;
  id: number;
  typeSender: string;
  titleForm: string;
  preorderDto: PreOrderDto;


  constructor(client_print: Client, type_client_print: number,
              date_exit_device: Date, id: number, typeSender: string,
              titleForm: string, preorderDto ?: PreOrderDto) {
    this.client_print = client_print;
    this.type_client_print = type_client_print;
    this.date_exit_device = date_exit_device;
    this.id = id;
    this.typeSender = typeSender;
    this.titleForm = titleForm;
    this.preorderDto = preorderDto;
  }
}
