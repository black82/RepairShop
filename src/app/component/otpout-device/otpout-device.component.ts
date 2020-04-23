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
import {HttpClien} from '../service/clientservice.service';

import {Repair} from '../entity/Repair';
import {Device} from '../entity/Device';
import {OutputTest} from '../entity/OutputTest';
import {AlertServiceService} from '../service/alert-service.service';
import {PrintService} from '../service/print.service';
import {faPrint} from '@fortawesome/free-solid-svg-icons/faPrint';
import {PrintEntity} from '../entity/Print_Pojo';
import {FiltreMoreDeviceRepairActivService} from '../service/filtre-more-device-repair-activ.service';


@Component({
  selector: 'app-otpout-device',
  templateUrl: './otpout-device.component.html',
  styleUrls: ['./otpout-device.component.css']
})
export class OtpoutDeviceComponent implements OnInit {
  date = faCalendarCheck;
  usertag = faUserTag;
  mobile = faMobile;
  barcode = faBarcode;
  cogs = faCogs;
  chip = faMicrochip;
  work = faTools;
  money = faMoneyBill;
  address = faMapMarkedAlt;
  model = faMobileAlt;
  depossit = faMoneyCheck;
  accessory = faHatWizard;
  test = faClipboardList;
  discar = faTrashAlt;
  sensors = faDigitalTachograph;
  display = faMobileAlt;
  conections = faNetworkWired;
  sound = faVolumeUp;
  touch = faFingerprint;
  wifi = faWifi;
  microfon = faMicrophone;
  sim = faSimCard;
  keybord = faKeyboard;
  camera = faCamera;
  text = faEnvelopeOpenText;
  save = faDownload;
  printer = faPrint;
  return_device_button_text = 'Search Device';
  formClient: FormGroup;
  titleForm = 'Search Return Device by  Tel. Number';
  client: Client;
  output_test: OutputTest;
  repair_output: Repair;
  repair_input: Repair;
  device_input: Device;
  device_repair_active: Device[] = [];
  show_client = false;
  formSubmitted = false;

  constructor(private fb: FormBuilder, private httpService: HttpClien,
              private alert_service: AlertServiceService, private printService: PrintService,
              private  check_device: FiltreMoreDeviceRepairActivService) {
  }

  ngOnInit() {
    setInterval(elt => {
      if (this.show_client) {
        this.animation_call();
        clearInterval();
      }
    }, 300);

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
    if (!this.formClient.valid) {
      Object.keys(this.formClient.controls).forEach(key => {
        this.formClient.controls[key].markAllAsTouched();
      });
    }
    this.httpService.outputDeviceForm(this.createClient(), this.client.id).subscribe(
      () => {
        this.alert_service.success(null, 'The client' + this.client.name +
          'received a device and closed the repair procedure !!! Client Id ' + this.client.id, true, null, '');
      },
      error => {
        this.show_client = false;
        this.alert_service.error(null, 'The client' + this.client.name +
          'received a device and not closed the repair procedure !!! Client Id '
          + this.client.id + '\n' + error.message, false, null, '', error);

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
    return this.repair_output;
  }

  filterCurrentDevice(): Device[] {
    this.client.device.forEach((device) => {
      if (device.rightNowInRepair) {
        this.device_repair_active.push(device);
      }
    });
    return this.device_repair_active;
  }

  filterRepairActiveRepair(): void {
    this.device_input.repairs.forEach(repair => {
      if (repair.nowInRepair) {
        this.repair_input = repair;
        this.show_client = true;
      }
    });
  }

  identified_current_device() {
    const devices = this.filterCurrentDevice();
    if (devices.length === 1) {
      this.device_input = devices[0];
      this.filterRepairActiveRepair();
      this.createFormAfterClientCam();
    } else {
      if (devices.length === 0) {
        this.alert_service.warn('', 'Unfortunately, ' +
          'the introduced customer no longer has a device in repair.', false, false, '', null);
      } else {
        this.check_device.device_select(this.device_repair_active);
      }
    }

  }

  printPage(): void {
    if (!this.formClient.valid) {
      this.alert_service.warn('', 'Before sending the form ' +
        'to the printer please complete all the fields !!! Thank you. Try again.', false, false, '', null);
      Object.keys(this.formClient.controls).forEach(key => {
        this.formClient.controls[key].markAllAsTouched();
      });
      return;
    }
    const client = this.client;
    client.device = [];
    this.filterCurrentDevice();
    client.device.push(this.device_input);
    client.device[0].repairs = [];
    client.device[0].repairs.push(this.createClient());
    this.printService.print_page(new PrintEntity(client, 2));

  }

  select_device($event: Device) {
    this.device_input = $event;
    this.filterRepairActiveRepair();
    this.createFormAfterClientCam();
  }

  dismissed() {
    this.alert_service.warn('', 'Sorry, you ' +
      'left the module.', true, false, '', null);
  }

  animation_call() {
    this.animationButtonForm();
    this.animationCheckBox();
    this.animationTitle();
    this.animationInput();
  }

  animationButtonForm() {
    document.querySelectorAll('.button').forEach(button => {
      button.addEventListener('mouseenter', evt => {
        if (this.formClient.valid) {
          button.id = 'success-button';
        } else {
          button.id = 'wrong-button';
        }
      });
    });
  }

  animationCheckBox() {
    document.querySelectorAll('.checkbox').forEach(checkbox => {
      checkbox.addEventListener('click', evt => {
        if (!checkbox.value) {
          checkbox.id = 'success-checkbox';
        } else {
          checkbox.id = 'wrong-checkbox';
        }
      });
    });
  }

  animationTitle() {
    document.querySelectorAll('fa-icon').forEach(title => {
      title.addEventListener('mouseenter', evt => {
        if (!title.classList.contains('button-icon')) {
          title.id = 'title-hover';
        }
      });
    });
  }

  animationInput() {
    document.querySelectorAll('label').forEach(label => {
      const icon = label.querySelector('fa-icon');
      const inputElement = label.querySelector('input');
      if (inputElement?.value?.length !== 0 && inputElement?.style) {
        icon.style.color = '#34495E';
      }
      label.addEventListener('input', ev => {
        if (ev.target.validity.valid && icon?.style) {
          icon.style.color = '#34495E';
        }
      });
    });

  }


  show_client_change(hide: boolean) {
    this.show_client = hide;
  }
}
