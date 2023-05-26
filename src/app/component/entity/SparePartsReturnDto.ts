import {MultiPartFile} from './MultiPartFile';

export interface SparePartsReturnDto {
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

  multipartFiles: MultiPartFile[];
}
