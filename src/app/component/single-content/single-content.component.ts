import {Component, OnInit} from '@angular/core';
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


  constructor() {
  }

  ngOnInit() {
  }

  showTestEnter($event: MouseEvent) {
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

  chekdanger() {
    return document.getElementsByClassName('danger');
  }
}
