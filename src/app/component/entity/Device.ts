import {Repair} from './Repair';

export class Device {
  id_Device: number;
  model: string;
  state_of_use: string;
  imei: string;
  code_device: string;
  password_device: string;
  accessory: string;
  rightNowInRepair: boolean;
  repairs: Repair[];


  constructor(id_Device: number, model: string, state_of_use: string,
              imei: string, code_device: string, password_device: string,
              accessory: string, repairs: Array<Repair>) {
    this.id_Device = id_Device;
    this.model = model;
    this.state_of_use = state_of_use;
    this.imei = imei;
    this.code_device = code_device;
    this.password_device = password_device;
    this.accessory = accessory;
    this.repairs = repairs;
  }

}
