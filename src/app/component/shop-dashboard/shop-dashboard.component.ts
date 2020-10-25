import {Component, OnInit} from '@angular/core';
import {faFileMedicalAlt} from '@fortawesome/free-solid-svg-icons/faFileMedicalAlt';
import {
  faConciergeBell,
  faEnvelopeOpen,
  faFileImage,
  faFileSignature,
  faHome,
  faMobile,
  faSignInAlt,
  faUserTag
} from '@fortawesome/free-solid-svg-icons';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faLaptopCode} from '@fortawesome/free-solid-svg-icons/faLaptopCode';
import {faChartLine} from '@fortawesome/free-solid-svg-icons/faChartLine';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons/faUserEdit';
import {faPhoneSquare} from '@fortawesome/free-solid-svg-icons/faPhoneSquare';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons/faUnlockAlt';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {faUserCog} from '@fortawesome/free-solid-svg-icons/faUserCog';
import {faUserShield} from '@fortawesome/free-solid-svg-icons/faUserShield';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import {faStore} from '@fortawesome/free-solid-svg-icons/faStore';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faToolbox} from '@fortawesome/free-solid-svg-icons/faToolbox';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons/faAngleDown';
import {faEuroSign} from '@fortawesome/free-solid-svg-icons/faEuroSign';

@Component({
  selector: 'app-shop-dashboard',
  templateUrl: './shop-dashboard.component.html',
  styleUrls: ['./shop-dashboard.component.css']
})
export class ShopDashboardComponent implements OnInit {
  logs = faFileMedicalAlt;
  home = faHome;
  admin = false;
  calendar = faCalendarPlus;
  device = faLaptopCode;
  charts = faChartLine;
  users = faUserEdit;
  mail = faEnvelopeOpen;
  phone = faPhoneSquare;
  devices = faMobile;
  saleDevices = faEuroSign;
  passwordRecovery = faUnlockAlt;
  signIn = faSignInAlt;
  signOut = faSignOutAlt;
  signUp = faUserPlus;

  repair = faTools;
  admins = faUserCog;
  adminIcon = faUserShield;
  notificationSend = faConciergeBell;
  outputRepair = faTimesCircle;
  redact = faFileSignature;
  usertag = faUserTag;
  images = faFileImage;
  stored = faStore;
  tools = faCogs;
  adminTools = faToolbox;
  dropdown = faAngleDown;

  constructor() {
  }

  ngOnInit(): void {
  }

}
