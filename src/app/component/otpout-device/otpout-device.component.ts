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
import {FormBuilder, FormGroup} from '@angular/forms';
import {Client} from '../entity/ClientWeb';
import {ClientserviceService} from '../service/clientservice.service';
import {Router} from '@angular/router';

import {Repair} from '../entity/Repair';
import {Device} from '../entity/Device';
import {OutputTest} from '../entity/OutputTest';


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


  constructor(private fb: FormBuilder, private httpService: ClientserviceService,
              private router: Router) {
  }

  ngOnInit() {

  }

  createFormAfterClientCam() {
    this.formClient = this.fb.group({
      return_date: [this.repair_input.output_date],
      name_family_output: [this.client.name + ' ' + this.client.family],
      mobile_output: [this.device_input.model],
      imei_output: [this.device_input.imei],
      defect_output: [this.repair_input.defect],
      parts_replace_output: [this.repair_input.parts_replaced],
      work_don_output: [this.repair_input.work_don],
      price_output: [this.repair_input.price],
      address_output: [this.client.address],
      model_output: [this.device_input.model],
      deposit_output: [this.repair_input.deposit],
      accessory_output: [this.device_input.accessory],
      sensor_output: [false],
      display_output: [false],
      connections_output: [false],
      sound_equipment_output: [false],
      touch_output: [false],
      wi_fi_output: [false],
      microphone_output: [false],
      sim_output: [false],
      keyboard_output: [false],
      camera_output: [false],
      note_output: [this.repair_input.note],
    });
  }

  client_catch(client1) {
    if (client1 as Client) {
      this.client = client1;
      console.log(this.client);
      this.identified_current_device();

    }
  }


  submitForm() {
    this.httpService.outputDeviceForm(this.createClient(), this.client.id).subscribe(
      report =>
        report);
    window.alert('Operazione e andata con sucesso!!!');
    this.router.navigate(['']);
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

  filterCurrentDevice() {
    this.client.device.forEach((device) => {
      if (device.rightNowInRepair) {
        console.log(device);
        this.device_input = device;
      }
    });
    if (this.device_input) {
      window.alert('Reparazione non disponibile');
    }
  }

  falterRepairActiveRepair() {
    this.device_input.repairs.forEach(repair => {
      if (repair.output_date === null) {
        this.repair_input = repair;
      }
    });
  }

  // Urgent rewrite create ne component to wiu 2 device repair active
  identified_current_device() {
    this.filterCurrentDevice();
    this.falterRepairActiveRepair();
    this.createFormAfterClientCam();
  }

}
