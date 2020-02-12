import {Device} from './Device';

export class Client {
  id: number;
  family: string;
  name: string;
  email: string;
  telephone_number: string;
  address: string;
  device: Device[];

  constructor(id: number, family: string, name: string, email: string, telephone_number: string, address: string, device: Device[]) {
    this.id = id;
    this.family = family;
    this.name = name;
    this.email = email;
    this.telephone_number = telephone_number;
    this.address = address;
    this.device = device;
  }
}
