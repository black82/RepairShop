import {Component, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import {faHistory} from '@fortawesome/free-solid-svg-icons/faHistory';
import {faToolbox} from '@fortawesome/free-solid-svg-icons/faToolbox';
import {DeviceInputService} from '../service/device-input.service';

@Component({
  selector: 'app-search-by-name-client-repair',
  templateUrl: './search-by-name-client-repair.component.html',
  styleUrls: ['./search-by-name-client-repair.component.css']
})
export class SearchByNameClientRepairComponent implements OnInit {
  datasource: Client[];
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
    this.deviceService.$client_pushArray.subscribe(clients => {
      this.datasource = clients;
      this.paginator = true;
      this.formHide = false;
    });
  }

  shows(element: Client) {
    this.hideClient();
    const timeout = setTimeout(() => {
      this.shouwClient = true;
      this.client_shouw = element;
      clearTimeout(timeout);
    }, 300);

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
