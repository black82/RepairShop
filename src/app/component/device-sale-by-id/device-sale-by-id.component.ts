import {Component, OnInit} from '@angular/core';
import {DeviceForSaleTransaction} from '../entity/DeviceForSaleTransaction';
import {DeviceInputService} from '../service/device-input.service';
import {faHistory} from '@fortawesome/free-solid-svg-icons/faHistory';

@Component({
  selector: 'app-device-sale-by-id',
  templateUrl: './device-sale-by-id.component.html',
  styleUrls: ['./device-sale-by-id.component.css']
})
export class DeviceSaleByIdComponent implements OnInit {
  button = 'Device Sale By Id';
  nameForm = 'Search Device to Sale By Id ';
  shouwClient = false;
  hide_button = faHistory;

  constructor(private deviceInputService: DeviceInputService) {
  }

  ngOnInit(): void {
  }

  client_catch(deviceForSaleTransaction: DeviceForSaleTransaction) {
    this.shouwClient = true;
    this.deviceInputService.$deviceForSaleClientTransaction.emit(deviceForSaleTransaction);
  }

  hideClient() {
    this.shouwClient = false;
  }
}
