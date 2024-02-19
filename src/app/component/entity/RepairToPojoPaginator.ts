export class RepairToPojoPaginator {
  repairId: number;
  clientName: string;
  clientFamily: string;
  companyName: string;
  deviceModel: string;

  constructor(repairId: number, clientName: string, clientFamily: string, companyName: string, deviceModel: string) {
    this.repairId = repairId;
    this.clientName = clientName;
    this.clientFamily = clientFamily;
    this.companyName = companyName;
    this.deviceModel = deviceModel;
  }

}
