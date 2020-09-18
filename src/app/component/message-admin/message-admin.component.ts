import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {PageEvent} from '@angular/material/paginator';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import {faHistory} from '@fortawesome/free-solid-svg-icons/faHistory';
import {faToolbox} from '@fortawesome/free-solid-svg-icons/faToolbox';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons';
import {faCalendarMinus} from '@fortawesome/free-solid-svg-icons/faCalendarMinus';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {MessageInvoice} from '../entity/MessageInvoice';
import {AdminServiceService} from '../service/admin-service.service';

@Component({
  selector: 'app-message-admin',
  templateUrl: './message-admin.component.html',
  styleUrls: ['./message-admin.component.css']
})
export class MessageAdminComponent implements OnInit {

  repair_icon = faSearch;
  pageEvent: PageEvent;
  datasource: MessageInvoice[];
  pageIndex: number;
  pageSize: number;
  length: number;
  message: MessageInvoice;
  shouwClient = false;
  shows_button = faAngleDoubleRight;
  hide_button = faHistory;
  tools = faToolbox;
  paginator = false;
  formDataInterval: FormGroup;
  date_init = faCalendarPlus;
  date = faCalendarMinus;
  index = 0;

  constructor(private http: HttpClien,
              private formBuilder: FormBuilder,
              private alertService: AlertServiceService,
              private adminService: AdminServiceService,) {
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
    this.http.getMessagePageableByInterval(
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

  shows(element: MessageInvoice) {
    this.hideClient();
    const timeout = setTimeout(() => {
      this.shouwClient = true;
      this.adminService.$show_notified.emit(element);
      clearTimeout(timeout);
    }, 300);

  }

  hideClient() {
    this.shouwClient = false;
    this.message = null;
  }

  setNewDateFormat(date: Date): Date {
    return new Date(date);
  }
}
