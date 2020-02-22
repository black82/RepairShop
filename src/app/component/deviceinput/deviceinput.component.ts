import {Component, OnInit} from '@angular/core';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faPhoneSquare, faUserTag} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faUserLock} from '@fortawesome/free-solid-svg-icons/faUserLock';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
import {faMoneyCheck} from '@fortawesome/free-solid-svg-icons/faMoneyCheck';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons/faUnlockAlt';
import {faHatWizard} from '@fortawesome/free-solid-svg-icons/faHatWizard';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons/faClipboardList';
import {faFingerprint} from '@fortawesome/free-solid-svg-icons/faFingerprint';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faNetworkWired} from '@fortawesome/free-solid-svg-icons/faNetworkWired';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import {faDigitalTachograph} from '@fortawesome/free-solid-svg-icons/faDigitalTachograph';
import {faWifi} from '@fortawesome/free-solid-svg-icons/faWifi';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {faSimCard} from '@fortawesome/free-solid-svg-icons/faSimCard';
import {faKeyboard} from '@fortawesome/free-solid-svg-icons/faKeyboard';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {Client} from '../entity/ClientWeb';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Device} from '../entity/Device';
import {Repair} from '../entity/Repair';
import {InputTest} from '../entity/InputTest';
import {ClientserviceService} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';

@Component({
  selector: 'app-deviceinput',
  templateUrl: './deviceinput.component.html',
  styleUrls: ['./deviceinput.component.css']
})
export class DeviceinputComponent implements OnInit {
  used = faHeart;
  mobile = faMobile;
  email = faEnvelope;
  money = faMoneyBill;
  cogs = faCogs;
  address = faAddressCard;
  date = faCalendarPlus;
  code = faUserLock;
  usertag = faUserTag;
  phone = faPhoneSquare;
  barcode = faBarcode;
  money2 = faMoneyCheck;
  password = faUnlockAlt;
  accessory = faHatWizard;
  test = faClipboardList;
  note = faCommentAlt;
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
  client: Client;
  formClient: FormGroup;
  device: Device;
  repair: Repair;
  inputTest: InputTest;
  formSubmitted: boolean;
  iconSubmitted_icon: boolean;
  requiredError: boolean;


  constructor(private fb: FormBuilder, private httpService: ClientserviceService,
              private alert_service: AlertServiceService) {
    this.formClient = this.fb.group({
      family: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone_number: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      state_of_use: new FormControl('', [Validators.required]),
      imei: new FormControl('', [Validators.required]),
      code_device: new FormControl('', [Validators.required]),
      password_device: new FormControl('', [Validators.required]),
      accessory: new FormControl('', [Validators.required]),
      date_to_enter: new FormControl('', [Validators.required]),
      defect: new FormControl('', [Validators.required]),
      deposit: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required, Validators.max(6)]),
      sensors_input: new FormControl(null, [Validators.required]),
      display_input: new FormControl(null, [Validators.required]),
      connectors_input: new FormControl(null, [Validators.required]),
      sound_equipment_input: new FormControl(null, [Validators.required]),
      touch_input: new FormControl(null, [Validators.required]),
      wi_fi_input: new FormControl(null, [Validators.required]),
      microphone_input: new FormControl(null, [Validators.required]),
      sim_input: new FormControl(null, [Validators.required]),
      keyboard_input: new FormControl(null, [Validators.required]),
      camera_input: new FormControl(),
      note: new FormControl('')
    });
  }

  ngOnInit() {
  }


  createClient() {
    let formData = Object.assign({});
    formData = Object.assign(formData, this.formClient.value);
    this.inputTest = new InputTest(null, formData.sensors_input, formData.display_input,
      formData.connectors_input, formData.sound_equipment_input, formData.touch_input,
      formData.wi_fi_input, formData.microphone_input, formData.sim_input,
      formData.keyboard_input, formData.camera_input);
    this.repair = new Repair(null, formData.date_to_enter, null, formData.defect,
      formData.deposit, formData.price, null, null, true,
      this.inputTest, null, formData.note);
    this.device = new Device(null, formData.model, formData.state_of_use,
      formData.imei, formData.code_device, formData.password_device, formData.accessory, true, [this.repair]);
    this.client = new Client(null, formData.family, formData.name, formData.email,
      formData.telephone_number, formData.address, [this.device]);
    console.log(this.client);
  }

  submitForm() {
    if (!this.formClient.valid) {
      Object.keys(this.formClient.controls).forEach(key => {
        this.formClient.controls[key].markAllAsTouched();
      });
      this.alert_service.warn('', 'You form not valid',
        false, false, '');
      return;
    }
    this.createClient();
    this.httpService.createClient(this.client).subscribe(response => {
        this.alert_service.success(null, 'The client' + this.client.name +
          'received a device and closed the repair procedure !!! Client Id ' + response, true, null, '');
      },
      error => {
        this.alert_service.error(null, 'The client' + this.client.name +
          'received a device and not closed the repair procedure !!! Client Id '
          + this.client.id + '\n' + error.message, false, null, '', error);

      }
    );
  }

  getf() {
    return this.formClient.controls;
  }
}


