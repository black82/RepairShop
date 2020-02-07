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
import {faEject} from '@fortawesome/free-solid-svg-icons/faEject';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons/faClipboardList';
import {faFingerprint} from '@fortawesome/free-solid-svg-icons/faFingerprint';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';

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
  discar = faEject;
  sensors = faFingerprint;
  display = faMobileAlt;

  constructor() {
  }

  ngOnInit() {
  }

}
