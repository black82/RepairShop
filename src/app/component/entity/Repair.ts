import {InputTest} from './InputTest';
import {OutputTest} from './OutputTest';

export class Repair {
  id: number;
  date_to_enter: Date;
  output_date: Date;
  defect: string;
  deposit: number;
  price: number;
  work_don: string;
  parts_replaced: string;
  inputModule: InputTest;
  outputTest: OutputTest;

  constructor(id: number, date_to_enter: Date, output_date: Date, defect: string,
              deposit: number, price: number, work_don: string, parts_replaced: string,
              inputModule: InputTest, outputTest: OutputTest) {
    this.id = id;
    this.date_to_enter = date_to_enter;
    this.output_date = output_date;
    this.defect = defect;
    this.deposit = deposit;
    this.price = price;
    this.work_don = work_don;
    this.parts_replaced = parts_replaced;
    this.inputModule = inputModule;
    this.outputTest = outputTest;
  }
}
