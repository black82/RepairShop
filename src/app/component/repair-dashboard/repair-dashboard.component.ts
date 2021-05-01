import {Component, OnInit} from '@angular/core';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faLaptopCode} from '@fortawesome/free-solid-svg-icons/faLaptopCode';
import {faChartLine} from '@fortawesome/free-solid-svg-icons/faChartLine';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons/faUserEdit';
import {faFileMedicalAlt} from '@fortawesome/free-solid-svg-icons/faFileMedicalAlt';
import {faEnvelopeOpen, faFileImage, faFileSignature, faHome, faMobile, faUserTag} from '@fortawesome/free-solid-svg-icons';
import {faPhoneSquare} from '@fortawesome/free-solid-svg-icons/faPhoneSquare';
import {faIdCard} from '@fortawesome/free-solid-svg-icons/faIdCard';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {faUserCog} from '@fortawesome/free-solid-svg-icons/faUserCog';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons/faTimesCircle';
import {faStore} from '@fortawesome/free-solid-svg-icons/faStore';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faToolbox} from '@fortawesome/free-solid-svg-icons/faToolbox';

@Component({
  selector: 'app-repair-dashboard',
  templateUrl: './repair-dashboard.component.html',
  styleUrls: ['./repair-dashboard.component.css']
})
export class RepairDashboardComponent implements OnInit {
  isAdmin = false;
  calendar = faCalendarPlus;
  device = faLaptopCode;
  charts = faChartLine;
  users = faUserEdit;
  logs = faFileMedicalAlt;
  mail = faEnvelopeOpen;

  home = faHome;
  admin = false;
  phone = faPhoneSquare;
  idIcon = faIdCard;
  envelope = faEnvelope;
  signOut = faSignOutAlt;
  signUp = faUserPlus;
  devices = faMobile;
  repair = faTools;
  admins = faUserCog;
  outputRepair = faTimesCircle;
  redact = faFileSignature;
  usertag = faUserTag;
  images = faFileImage;
  stored = faStore;
  tools = faCogs;
  adminTools = faToolbox;

  constructor() {
  }

  ngOnInit(): void {
  }

}
