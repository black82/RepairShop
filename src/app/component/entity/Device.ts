import {Repair} from './Repair';

export class Device {
  id: number;
  model: string;
  state_of_use: string;
  imei: string;
  code_device: string;
  password_device: string;
  accessory: string;
  repair: Repair[];

  constructor(id: number, model: string, state_of_use: string,
              imei: string, code_device: string, password_device: string, accessory: string, repair: Repair[]) {
    this.id = id;
    this.model = model;
    this.state_of_use = state_of_use;
    this.imei = imei;
    this.code_device = code_device;
    this.password_device = password_device;
    this.accessory = accessory;
    this.repair = repair;
  }
}
