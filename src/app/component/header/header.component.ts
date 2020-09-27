import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  faClipboardCheck,
  faConciergeBell,
  faEnvelopeOpen,
  faFileSignature,
  faHome,
  faMobile,
  faSignInAlt,
  faUserTag
} from '@fortawesome/free-solid-svg-icons';
import {HttpClien} from '../service/clientservice.service';
import {AdminServiceService} from '../service/admin-service.service';
import {Subscription} from 'rxjs';
import {faFileMedicalAlt} from '@fortawesome/free-solid-svg-icons/faFileMedicalAlt';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faLaptopCode} from '@fortawesome/free-solid-svg-icons/faLaptopCode';
import {faChartLine} from '@fortawesome/free-solid-svg-icons/faChartLine';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons/faUserEdit';
import {faPhoneSquare} from '@fortawesome/free-solid-svg-icons/faPhoneSquare';
import {faIdCard} from '@fortawesome/free-solid-svg-icons/faIdCard';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons/faUserPlus';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons/faUnlockAlt';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  logs = faFileMedicalAlt;
  home = faHome;
  admin = false;
  calendar = faCalendarPlus;
  device = faLaptopCode;
  charts = faChartLine;
  users = faUserEdit;
  mail = faEnvelopeOpen;
  phone = faPhoneSquare;
  idIcon = faIdCard;
  envelope = faEnvelope;
  passwordRecovery = faUnlockAlt;
  signIn = faSignInAlt;
  signOut = faSignOutAlt;
  signUp = faUserPlus;
  devices = faMobile;
  repair = faTools;
  notificationSend = faConciergeBell;
  outputRepair = faClipboardCheck;
  redact = faFileSignature;
  usertag = faUserTag;
  private subscribe_admin: Subscription;


  constructor(private http: HttpClien,
              private adminService: AdminServiceService) {
  }

  ngOnInit() {
    const view = localStorage.getItem('roles');
    if (view) {
      this.admin = true;
    }
    this.subscribe_admin = this.adminService.$admin_show.subscribe(value => {
      this.showAdminPage(value);
    });
  }

  logout() {
    this.http.logout();
  }

  showAdminPage(value) {
    this.addAnimeMenuBox(value);
    this.addAnimeToHelper(value);

  }

  addAnimeToHelper(value: boolean) {
    if (value) {
      const timeout = setTimeout(() => {
        const elementById = document.getElementById('helper');
        if (elementById) {
          elementById.classList.add('anime-helper');
          const timeout1 = setTimeout(() => {
            elementById.classList.add('anime-helper-2');
            clearTimeout(timeout1);
          }, 4000);
        }
        clearTimeout(timeout);
      }, 1000);

    } else {
      const elementById = document.getElementById('helper');
      if (elementById) {
        elementById.classList.remove('anime-helper');
        elementById.classList.remove('anime-helper-2');
      }
    }
  }

  addAnimeMenuBox(value) {
    const menu = document.getElementById('menu-box');
    this.admin = value;
    if (menu) {
      menu.classList.add('animation-menu-box');
    }

    const timeout = setTimeout(() => {
      menu.classList.remove('animation-menu-box');
      clearTimeout(timeout);
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.subscribe_admin) {
      this.subscribe_admin.unsubscribe();
    }
  }
}
