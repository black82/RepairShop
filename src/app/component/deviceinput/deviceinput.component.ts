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
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Device} from '../entity/Device';
import {Repair} from '../entity/Repair';
import {InputTest} from '../entity/InputTest';
import {ClientserviceService} from '../service/clientservice.service';
import {Router} from '@angular/router';

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

  constructor(private fb: FormBuilder, private httpService: ClientserviceService,
              private router: Router) {
    this.formClient = this.fb.group({
      family: new FormControl(''),
      name: new FormControl(''),
      email: new FormControl(''),
      telephone_number: new FormControl(''),
      address: new FormControl(''),
      model: new FormControl(''),
      state_of_use: new FormControl(''),
      imei: new FormControl(''),
      code_device: new FormControl(''),
      password_device: new FormControl(''),
      accessory: new FormControl(''),
      date_to_enter: new FormControl(''),
      defect: new FormControl(''),
      deposit: new FormControl(''),
      price: new FormControl(''),
      sensors_input: new FormControl(),
      display_input: new FormControl(),
      connectors_input: new FormControl(),
      sound_equipment_input: new FormControl(),
      touch_input: new FormControl(),
      wi_fi_input: new FormControl(),
      microphone_input: new FormControl(),
      sim_input: new FormControl(),
      keyboard_input: new FormControl(),
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
    this.createClient();
    this.httpService.createClient(this.client).subscribe(report =>
      report);
    window.alert('Client  create  success!!!');
    this.router.navigate(['']);
  }
}
