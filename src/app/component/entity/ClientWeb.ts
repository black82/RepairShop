import {Device} from './Device';

export class Client {
  id: number;
  family: string;
  name: string;
  companyName: string;
  email: string;
  telephone_number: string;
  telephone_number_second: string;
  address: string;
  device: Array<Device>;
  send_email_active: boolean;
  typeClient: boolean;
  ivaCompany: string;
  sdiCompany: string;
  createUser: string;
  lastModified: string;


  constructor(id: number, family: string, name: string, companyName: string,
              email: string, telephone_number: string,
              telephone_number_second: string, address: string,
              device: Array<Device>, send_email_active: boolean,
              typeClient: boolean, ivaCompany: string,
              sdiCompany: string, createUser: string,
              lastModified: string) {
    this.id = id;
    this.family = family;
    this.name = name;
    this.companyName = companyName;
    this.email = email;
    this.telephone_number = telephone_number;
    this.telephone_number_second = telephone_number_second;
    this.address = address;
    this.device = device;
    this.send_email_active = send_email_active;
    this.typeClient = typeClient;
    this.ivaCompany = ivaCompany;
    this.sdiCompany = sdiCompany;
    this.createUser = createUser;
    this.lastModified = lastModified;
  }
}
