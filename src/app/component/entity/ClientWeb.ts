import {Device} from './Device';

export class Client {
  id: number;
  family: string;
  name: string;
  email: string;
  telephone_number: string;
  address: string;
  device: Array<Device>;
  send_email_active: boolean;


  constructor(id: number, family: string, name: string,
              email: string, telephone_number: string, address: string,
              device: Array<Device>, send_email_active: boolean) {
    this.id = id;
    this.family = family;
    this.name = name;
    this.email = email;
    this.telephone_number = telephone_number;
    this.address = address;
    this.device = device;
    this.send_email_active = send_email_active;
  }
}
