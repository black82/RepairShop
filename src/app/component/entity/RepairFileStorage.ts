import {ImageList} from './ImageList';

export class RepairFileStorage {
  storageId: number;
  repair_Id: number;
  invoiceToEnterDeviceToRepair: string;
  invoiceToExitDeviceToRepair: string;
  fotoEnterDevice: ImageList[];
  fotoExitDevice: ImageList[];
}
