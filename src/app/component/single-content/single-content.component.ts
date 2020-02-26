import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faUserLock} from '@fortawesome/free-solid-svg-icons/faUserLock';
import {faPhoneSquare, faUserTag} from '@fortawesome/free-solid-svg-icons';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons/faUnlockAlt';
import {faHatWizard} from '@fortawesome/free-solid-svg-icons/faHatWizard';
import {faDigitalTachograph} from '@fortawesome/free-solid-svg-icons/faDigitalTachograph';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faNetworkWired} from '@fortawesome/free-solid-svg-icons/faNetworkWired';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import {faFingerprint} from '@fortawesome/free-solid-svg-icons/faFingerprint';
import {faWifi} from '@fortawesome/free-solid-svg-icons/faWifi';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {faSimCard} from '@fortawesome/free-solid-svg-icons/faSimCard';
import {faKeyboard} from '@fortawesome/free-solid-svg-icons/faKeyboard';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {faMicrochip} from '@fortawesome/free-solid-svg-icons/faMicrochip';
import {Client} from '../entity/ClientWeb';
import {Device} from '../entity/Device';
import {Repair} from '../entity/Repair';

@Component({
  selector: 'app-single-content',
  templateUrl: './single-content.component.html',
  styleUrls: ['./single-content.component.css']
})
export class SingleContentComponent implements OnInit {
  chip = faMicrochip;
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
  password = faUnlockAlt;
  accessory = faHatWizard;
  display = faMobileAlt;
  sensors = faDigitalTachograph;
  conections = faNetworkWired;
  sound = faVolumeUp;
  touch = faFingerprint;
  wifi = faWifi;
  microfon = faMicrophone;
  sim = faSimCard;
  keybord = faKeyboard;
  camera = faCamera;
  text = faEnvelopeOpenText;
  work = faTools;
  showHidem = false;
  showContainer = false;
  @Input()
  client: Client;
  devices_element: Element[] = [];
  devices: Device[] = [];
  repairs: Repair[] = [];
  repairs_element: ElementRepair[] = [];
  @Input()
  private refresh: EventEmitter<Client> = new EventEmitter<Client>();


  constructor() {
  }

  ngOnInit() {
    if (this.client != null) {
      this.create_client(this.client);
    }
    this.refresh.subscribe(data => {
      this.create_client(data);
    });
  }

  create_client(client: Client) {
    this.devices_element = [];
    this.repairs_element = [];
    this.devices = client.device;
    this.devices.map(s => this.devices_element.push(new Element(false, s)));
    this.devices.forEach(device => {
        device.repairs.forEach(repair =>
          this.repairs_element.push(new ElementRepair(false, repair)));

      }
    );
  }

  showTestEnter() {
    this.showContainer = false;
    this.showHidem = !this.showHidem;
  }

  showTestReturn(event) {
    this.showHidem = false;
    this.showContainer = !this.showContainer;
  }

  functionHidem() {
    this.showHidem = false;
    this.showContainer = false;
  }


  showElement(element) {
    element.visible = !element.visible;
  }
}

class Element {
  visible: boolean;
  divice: Device;

  constructor(visible: boolean, divice: Device) {
    this.visible = visible;
    this.divice = divice;
  }
}

class ElementRepair {
  visible: boolean;
  repair_elemnt: Repair;

  constructor(visible: boolean, repair: Repair) {
    this.visible = visible;
    this.repair_elemnt = repair;
  }
}
