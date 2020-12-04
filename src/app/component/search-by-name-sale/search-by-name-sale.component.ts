import {Component, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import {faHistory} from '@fortawesome/free-solid-svg-icons/faHistory';
import {faToolbox} from '@fortawesome/free-solid-svg-icons/faToolbox';
import {DeviceInputService} from '../service/device-input.service';
import {DeviceForSaleTransaction} from '../entity/DeviceForSaleTransaction';

@Component({
  selector: 'app-search-by-name-sale',
  templateUrl: './search-by-name-sale.component.html',
  styleUrls: ['./search-by-name-sale.component.css']
})
export class SearchByNameSaleComponent implements OnInit {
  datasource: DeviceForSaleTransaction[];
  pageIndex: number;
  pageSize: number;
  length: number;
  client_shouw: Client;
  shouwClient = false;
  shows_button = faAngleDoubleRight;
  hide_button = faHistory;
  tools = faToolbox;
  paginator = false;
  formHide = true;

  constructor(private deviceService: DeviceInputService) {
  }

  ngOnInit(): void {
    this.deviceService.$deviceForSaleClientTransactionArray.subscribe(clients => {
      this.datasource = clients;
      this.paginator = true;
      this.formHide = false;
    });
  }

  shows(element: DeviceForSaleTransaction) {
    this.shouwClient = true;
    setTimeout(() => {
      this.deviceService.$deviceForSaleClientTransaction.emit(element);
    }, 200);

  }

  hideClient() {
    this.shouwClient = false;
    this.client_shouw = null;
  }

  setNewDateFormat(date: Date): Date {
    return new Date(date);
  }

  showForm() {
    this.paginator = !this.paginator;
    this.formHide = !this.formHide;
  }

}
