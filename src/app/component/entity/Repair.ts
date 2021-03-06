import {InputTest} from './InputTest';
import {OutputTest} from './OutputTest';
import {RepairFileStorage} from './RepairFileStorage';

export class Repair {
  repair_Id: number;
  date_to_enter: Date;
  exp_complet_date: Date;
  output_date: Date;
  defect: string;
  deposit: number;
  price: string;
  work_don: string;
  parts_replaced: string;
  nowInRepair: boolean;
  inputModule: InputTest;
  outputTest: OutputTest;
  note: string;
  noteOutput: string;
  repairFileStorage: RepairFileStorage;
  lastModifiedRepair: string;
  createUserRepair: string;
  closeUserRepair: string;


  constructor(repair_Id: number, date_to_enter: Date, exp_complet_date: Date, output_date: Date,
              defect: string, deposit: number,
              price: string, work_don: string,
              parts_replaced: string, nowInRepair: boolean,
              inputModule: InputTest, outputTest: OutputTest,
              note: string, noteOutput: string,
              repairFileStorage: RepairFileStorage, lastModifiedRepair: string,
              createUserRepair: string, closeUserRepair: string) {
    this.repair_Id = repair_Id;
    this.date_to_enter = date_to_enter;
    this.exp_complet_date = exp_complet_date;
    this.output_date = output_date;
    this.defect = defect;
    this.deposit = deposit;
    this.price = price;
    this.work_don = work_don;
    this.parts_replaced = parts_replaced;
    this.nowInRepair = nowInRepair;
    this.inputModule = inputModule;
    this.outputTest = outputTest;
    this.note = note;
    this.noteOutput = noteOutput;
    this.repairFileStorage = repairFileStorage;
    this.lastModifiedRepair = lastModifiedRepair;
    this.createUserRepair = createUserRepair;
    this.closeUserRepair = closeUserRepair;
  }
}
