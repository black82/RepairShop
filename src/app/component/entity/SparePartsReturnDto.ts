import {MultiPartFile} from './MultiPartFile';

export class SparePartsReturnDto {
  id: number;

  model: string;

  color: string;

  client: string;

  reason: string;

  difect: string;

  supplier: string;

  technicReceived: string;

  dateReceived: Date;

  technicControl: string;

  dateControl: Date;

  dateSend: Date;

  technicSend: string;

  status: string;

  filesSpareReturn: string [];
  testControl: string;

  testSupplier: string;


  constructor(id: number, model: string, color: string, client: string, reason: string, difect: string, supplier: string, technicReceived: string, dateReceived: Date, technicControl: string, dateControl: Date, dateSend: Date, technicSend: string, status: string, filesSpareReturn: string[], testControl: string, testSupplier: string) {
    this.id = id;
    this.model = model;
    this.color = color;
    this.client = client;
    this.reason = reason;
    this.difect = difect;
    this.supplier = supplier;
    this.technicReceived = technicReceived;
    this.dateReceived = dateReceived;
    this.technicControl = technicControl;
    this.dateControl = dateControl;
    this.dateSend = dateSend;
    this.technicSend = technicSend;
    this.status = status;
    this.filesSpareReturn = filesSpareReturn;
    this.testControl = testControl;
    this.testSupplier = testSupplier;
  }
}
