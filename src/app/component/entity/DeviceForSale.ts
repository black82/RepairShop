import {RepairFileStorage} from './RepairFileStorage';
import {OutputTest} from './OutputTest';
import {InputTest} from './InputTest';

export class DeviceForSale {
  idDeviceSale: number;
  model: string;
  deviceType: string;
  state_of_use: string;
  imei: string;
  code_device: string;
  password_device: string;
  accessory: string;
  conditionFlag: string;
  noteInput: string;
  noteOutput: string;
  garantyDuration: number;
  inputTest: InputTest;
  outputTest: OutputTest;
  repairFileStorage: RepairFileStorage;
  isSaled: boolean;
  bayingPrice: string;
  sellerPrice: string;
  dateBaying: Date;
  dateSell: Date;


  constructor(idDeviceSale: number, model: string, deviceType: string, state_of_use: string,
              imei: string, code_device: string, password_device: string, accessory: string,
              conditionFlag: string, noteInput: string, noteOutput: string, garantyDuration: number,
              inputTest: InputTest, outputTest: OutputTest, repairFileStorage: RepairFileStorage,
              isSaled: boolean, bayingPrice: string, sellerPrice: string, dateBaying: Date,
              dateSell: Date) {
    this.idDeviceSale = idDeviceSale;
    this.model = model;
    this.deviceType = deviceType;
    this.state_of_use = state_of_use;
    this.imei = imei;
    this.code_device = code_device;
    this.password_device = password_device;
    this.accessory = accessory;
    this.conditionFlag = conditionFlag;
    this.noteInput = noteInput;
    this.noteOutput = noteOutput;
    this.garantyDuration = garantyDuration;
    this.inputTest = inputTest;
    this.outputTest = outputTest;
    this.repairFileStorage = repairFileStorage;
    this.isSaled = isSaled;
    this.bayingPrice = bayingPrice;
    this.sellerPrice = sellerPrice;
    this.dateBaying = dateBaying;
    this.dateSell = dateSell;
  }
}
