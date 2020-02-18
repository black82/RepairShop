import {Component, OnInit} from '@angular/core';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import {faUserTag} from '@fortawesome/free-solid-svg-icons/faUserTag';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faMicrochip} from '@fortawesome/free-solid-svg-icons/faMicrochip';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import {faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faMoneyCheck} from '@fortawesome/free-solid-svg-icons/faMoneyCheck';
import {faHatWizard} from '@fortawesome/free-solid-svg-icons/faHatWizard';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons/faClipboardList';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faDigitalTachograph} from '@fortawesome/free-solid-svg-icons/faDigitalTachograph';
import {faNetworkWired} from '@fortawesome/free-solid-svg-icons/faNetworkWired';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import {faFingerprint} from '@fortawesome/free-solid-svg-icons/faFingerprint';
import {faWifi} from '@fortawesome/free-solid-svg-icons/faWifi';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {faSimCard} from '@fortawesome/free-solid-svg-icons/faSimCard';
import {faKeyboard} from '@fortawesome/free-solid-svg-icons/faKeyboard';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from '../entity/ClientWeb';
import {ClientserviceService} from '../service/clientservice.service';
import {Router} from '@angular/router';

import {Repair} from '../entity/Repair';
import {Device} from '../entity/Device';
import {OutputTest} from '../entity/OutputTest';
import {HttpErrorResponse} from '@angular/common/http';


@Component({
  selector: 'app-otpout-device',
  templateUrl: './otpout-device.component.html',
  styleUrls: ['./otpout-device.component.css']
})
export class OtpoutDeviceComponent implements OnInit {
  private date = faCalendarCheck;
  private usertag = faUserTag;
  private mobile = faMobile;
  private barcode = faBarcode;
  private cogs = faCogs;
  private chip = faMicrochip;
  private work = faTools;
  private money = faMoneyBill;
  private address = faMapMarkedAlt;
  private model = faMobileAlt;
  private depossit = faMoneyCheck;
  private accessory = faHatWizard;
  private test = faClipboardList;
  private discar = faTrashAlt;
  private sensors = faDigitalTachograph;
  private display = faMobileAlt;
  private conections = faNetworkWired;
  private sound = faVolumeUp;
  private touch = faFingerprint;
  private wifi = faWifi;
  private microfon = faMicrophone;
  private sim = faSimCard;
  private keybord = faKeyboard;
  private camera = faCamera;
  private text = faEnvelopeOpenText;
  private save = faDownload;
  private return_device_button_text = 'Search Device';
  formClient: FormGroup;
  private titleForm = 'Search Return Device';
  private client: Client;
  private output_test: OutputTest;
  private repair_output: Repair;
  private repair_input: Repair;
  private device_input: Device;
  private type_alert: string;
  private error: HttpErrorResponse;
  private show_alert: boolean;
  private message_alert: string;
  private show_client = false;
  private formSubmitted = false;

  constructor(private fb: FormBuilder, private httpService: ClientserviceService,
              private router: Router) {
  }

  ngOnInit() {

  }

  createFormAfterClientCam() {
    this.formClient = this.fb.group({
      return_date: [this.repair_input.output_date, [Validators.required]],
      name_family_output: [this.client.family, [Validators.required]],
      mobile_output: [this.device_input.model, [Validators.required]],
      imei_output: [this.device_input.imei, [Validators.required]],
      defect_output: [this.repair_input.defect, [Validators.required]],
      parts_replace_output: [this.repair_input.parts_replaced, [Validators.required]],
      work_don_output: [this.repair_input.work_don, [Validators.required]],
      price_output: [this.repair_input.price, [Validators.required]],
      address_output: [this.client.address, [Validators.required]],
      model_output: [this.device_input.model, [Validators.required]],
      deposit_output: [this.repair_input.deposit, [Validators.required]],
      accessory_output: [this.device_input.accessory, [Validators.required]],
      sensor_output: [false, [Validators.required]],
      display_output: [false, [Validators.required]],
      connections_output: [false, [Validators.required]],
      sound_equipment_output: [false, [Validators.required]],
      touch_output: [false, [Validators.required]],
      wi_fi_output: [false, [Validators.required]],
      microphone_output: [false, [Validators.required]],
      sim_output: [false, [Validators.required]],
      keyboard_output: [false, [Validators.required]],
      camera_output: [false, [Validators.required]],
      note_output: [this.repair_input.note],
    });
  }

  client_catch(client1) {
    if (client1 as Client) {
      this.client = client1;
      this.identified_current_device();
    }
  }


  submitForm() {
    this.httpService.outputDeviceForm(this.createClient(), this.client.id).subscribe(
      response => {
        this.show_alert_function(true, 'success', 'The client' + this.client.name +
          'received a device and closed the repair procedure !!! Client Id ' + this.client.id, null);
        this.router.navigate(['']).then(r => r);
      },
      error => {
        this.show_alert_function(true, 'error', 'The client' + this.client.name +
          'received a device and not closed the repair procedure !!! Client Id ' + this.client.id + '\n' + error.message, error);
      }
    );
  }

  createClient(): Repair {
    let formData = Object.assign({});
    formData = Object.assign(formData, this.formClient.value);
    this.output_test = new OutputTest(null, formData.sensor_output, formData.display_output,
      formData.connections_output, formData.sound_equipment_output, formData.touch_output,
      formData.wi_fi_output, formData.microphone_output, formData.sim_output,
      formData.keyboard_output, formData.camera_output);
    this.repair_output = new Repair(this.repair_input.id_Repair,
      this.repair_input.date_to_enter, this.formClient.controls.return_date.value,
      this.formClient.controls.defect_output.value,
      this.formClient.controls.deposit_output.value,
      this.formClient.controls.price_output.value,
      this.formClient.controls.work_don_output.value,
      this.formClient.controls.parts_replace_output.value, this.repair_input.nowInRepair,
      this.repair_input.inputModule, this.output_test, this.formClient.controls.note_output.value);
    this.repair_output.date_to_enter = this.repair_input.date_to_enter;
    console.log(this.repair_output);
    return this.repair_output;
  }

  filterCurrentDevice(): number {
    let cour = 0;
    this.client.device.forEach((device) => {
      if (device.rightNowInRepair) {
        console.log(device);
        this.device_input = device;
        cour++;
      }
    });
    if (cour === 0) {
      this.show_alert_function(true, 'warn', 'The client' + this.client.name +
        'has no device in repair !!! Client Id ' + this.client.id + '\n', null);
    }
    return cour;
  }

  falterRepairActiveRepair() {
    let cour = 0;
    this.device_input.repairs.forEach(repair => {
      if (repair.nowInRepair) {
        this.repair_input = repair;
        this.show_client = true;
        cour++;
      }
    });
    if (cour === 0) {
      this.show_alert_function(true, 'warn', 'The client' + this.client.name +
        'has no device in repair !!! Client Id ' + this.client.id + '\n', null);
    }
    return cour;
  }

  // Urgent rewrite create ne component to wiu 2 device repair active
  identified_current_device() {
    if (this.filterCurrentDevice() === 1) {
      if (this.falterRepairActiveRepair() === 1) {
        this.createFormAfterClientCam();
      }
    }
  }

  show_alert_function(show_alert: boolean, type_alert: string, message_alert: string, error_alert: HttpErrorResponse) {
    console.log(type_alert, message_alert, show_alert);
    this.error = error_alert;
    this.show_alert = show_alert;
    this.type_alert = type_alert;
    this.message_alert = message_alert;
  }


  close_alert() {
    this.show_alert = !this.show_alert;
  }
}
