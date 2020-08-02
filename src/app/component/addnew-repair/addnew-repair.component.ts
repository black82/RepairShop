import {Component, OnInit} from '@angular/core';
import {FormhidenService} from '../service/formhiden.service';
import {DeviceInputService} from '../service/device-input.service';
import {Subscription} from 'rxjs';
import {Client} from '../entity/ClientWeb';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';

@Component({
  selector: 'app-addnew-repair',
  templateUrl: './addnew-repair.component.html',
  styleUrls: ['./addnew-repair.component.css']
})
export class AddnewRepairComponent implements OnInit {
  button_container = true;
  search_imei_form = false;
  buttonEmailSearch = 'Search Imei';
  nameFormByImei = 'Search Customer By Imei Device';
  imei_icon = faBarcode;
  device_input_container = false;
  private show_client = false;
  private event_form: Subscription;
  private client: Client;

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

  searchByImei() {
    this.search_imei_form = !this.search_imei_form;
  }

  private inputClientDevice() {
    this.client.device[0].repairs = [];
    this.search_imei_form = false;
    this.button_container = false;
    this.device_input_container = true;
    const interval = setTimeout(() => {
      this.service_input.$client_push.emit(this.client);
      clearInterval(interval);
    }, 1000);
  }
}
