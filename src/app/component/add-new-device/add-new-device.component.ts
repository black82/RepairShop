import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormhidenService} from '../service/formhiden.service';
import {Client} from '../entity/ClientWeb';
import {Subscription} from 'rxjs';
import {faEnvelope, faPhoneSquare} from '@fortawesome/free-solid-svg-icons';
import {DeviceInputService} from '../service/device-input.service';

@Component({
  selector: 'app-add-new-device',
  templateUrl: './add-new-device.component.html',
  styleUrls: ['./add-new-device.component.css']
})
export class AddNewDeviceComponent implements OnInit, OnDestroy {
  nameFormByEmail = 'Search by Email';
  buttonEmailSearch = 'Search Email';
  nameFormPhone = 'Search by Tel. Number';
  buttonPhone = 'Search by Tel. Number ';
  client: Client;
  show_client: boolean;
  mail = faEnvelope;
  phone = faPhoneSquare;
  search_email_form = false;
  search_phone_form = false;
  device_input_container = false;
  button_container = true;
  private event_form: Subscription;

  constructor(private hide_form: FormhidenService,
              private service_input: DeviceInputService) {
  }

  ngOnInit(): void {
    this.event_form = this.hide_form.form_open.subscribe(value => {
      this.show_client = value;
    });
  }

  client_catch($event: Client) {
    if ($event as Client) {
      this.client = $event;
      if (this.client) {
        this.hide_form.form_open.emit(true);
        this.inputClientDevice();
      }
    }
  }

  ngOnDestroy(): void {
    if (this.event_form) {
      this.event_form.unsubscribe();
    }
  }

  searchByEmail() {
    this.search_phone_form = false;
    this.search_email_form = !this.search_email_form;
  }

  searchByPhone() {
    this.search_email_form = false;
    this.search_phone_form = !this.search_phone_form;
  }

  private inputClientDevice() {
    this.button_container = false;
    this.client.device = [];
    this.search_email_form = false;
    this.search_phone_form = false;
    this.device_input_container = true;
    const interval = setTimeout(() => {
      this.service_input.$client_push.emit(this.client);
      clearInterval(interval);
    }, 1000);

  }
}
