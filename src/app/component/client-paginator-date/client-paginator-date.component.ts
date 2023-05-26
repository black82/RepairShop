import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {Client} from '../entity/ClientWeb';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import {faHistory} from '@fortawesome/free-solid-svg-icons/faHistory';
import {faToolbox} from '@fortawesome/free-solid-svg-icons/faToolbox';
import {HttpClien} from '../service/clientservice.service';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons';
import {faCalendarMinus} from '@fortawesome/free-solid-svg-icons/faCalendarMinus';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {AlertServiceService} from '../service/alert-service.service';

@Component({
  selector: 'app-client-paginator-date',
  templateUrl: './client-paginator-date.component.html',
  styleUrls: ['./client-paginator-date.component.css']
})
export class ClientPaginatorDateComponent implements OnInit {

  repair_icon = faSearch;
  pageEvent: PageEvent;
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
  formDataInterval: UntypedFormGroup;
  date_init = faCalendarPlus;
  date = faCalendarMinus;
  listClients: Client[];
  index = 0;

  constructor(private http: HttpClien,
              private formBuilder: UntypedFormBuilder,
              private alertService: AlertServiceService) {
  }

  ngOnInit(): void {
    this.formDataInterval = this.formBuilder.group({
      date_init: [null,
        [
          Validators.required
        ]],
      date_complete:
        [null, [
          Validators.required
        ]]
    });
  }


  public getServerData(event?: PageEvent) {
    if (this.formDataInterval.invalid) {
      this.alertService.info(null, 'Value entered is not valid',
        false, false, '', null);
      return;
    }
    if (event === undefined) {
      event = new PageEvent();
      event.pageSize = 10;
      event.pageIndex = 0;
    }
    this.http.getClientPageableByInterval(
      event.pageIndex,
      event.pageSize,
      this.formDataInterval.controls.date_init.value,
      this.formDataInterval.controls.date_complete.value).subscribe(
      response => {
        this.datasource = response.content;
        this.pageIndex = response.pageable.pageNumber;
        this.pageSize = response.pageable.pageSize;
        this.length = response.totalElements;

      },
      () => {

      }
    );
    this.paginator = true;
    return event;
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
}
