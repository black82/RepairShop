import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {
  faArrowCircleLeft,
  faConciergeBell,
  faEnvelopeOpen,
  faFileImage,
  faFileSignature,
  faHome,
  faMobile,
  faSearch,
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
import {faStore} from '@fortawesome/free-solid-svg-icons/faStore';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faToolbox} from '@fortawesome/free-solid-svg-icons/faToolbox';
import {faAngleDown} from '@fortawesome/free-solid-svg-icons/faAngleDown';
import {faUserCog} from '@fortawesome/free-solid-svg-icons/faUserCog';
import {faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons/faHandHoldingUsd';
import {faEuroSign} from '@fortawesome/free-solid-svg-icons/faEuroSign';
import {faAppStoreIos} from '@fortawesome/free-brands-svg-icons/faAppStoreIos';
import {faPeopleCarry} from '@fortawesome/free-solid-svg-icons/faPeopleCarry';
import {faStar} from '@fortawesome/free-solid-svg-icons/faStar';
import {faUsersCog} from '@fortawesome/free-solid-svg-icons/faUsersCog';
import * as anime from 'node_modules/animejs/lib/anime.min.js';
import {faJediOrder} from '@fortawesome/free-brands-svg-icons/faJediOrder';
import {faDoorClosed} from '@fortawesome/free-solid-svg-icons/faDoorClosed';
import {AnimeJsProvider} from "../service/anime-js-provider.service";
import {faBiohazard} from "@fortawesome/free-solid-svg-icons/faBiohazard";
import {faBoxOpen} from "@fortawesome/free-solid-svg-icons/faBoxOpen";
import {faBoxArchive} from "@fortawesome/free-solid-svg-icons/faBoxArchive";
import {faPersonWalkingArrowLoopLeft} from "@fortawesome/free-solid-svg-icons/faPersonWalkingArrowLoopLeft";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  searches = faSearch;

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
  bayingDevice = faPeopleCarry;
  saleDevices = faEuroSign;
  repair = faTools;
  admins = faUserCog;
  newOrder = faBoxOpen;
  closeOrder = faBoxArchive;
  orderReturn=faPersonWalkingArrowLoopLeft
  expiredParts= faBiohazard
  returnAll=faArrowCircleLeft;
  private priviusMenu: HTMLElement;

  @ViewChild('adminMenu') set toolsLabelsAdminCall(element: HTMLElement) {
    this.addAnimeIcon();
  }

  notificationSend = faConciergeBell;
  sellDevices = faHandHoldingUsd;
  outputRepair = faAppStoreIos;
  redact = faFileSignature;
  usertag = faUserTag;
  images = faFileImage;
  stored = faStore;
  tools = faCogs;
  star = faStar;
  positionShow = false;
  adminTools = faToolbox;
  dropdown = faAngleDown;
  private subscribe_admin: Subscription;
  positionUser: string;
  private subscriptionPosition: Subscription;
  isAnimated: boolean;


  constructor(private http: HttpClien,
              private adminService: AdminServiceService) {
  }

  ngOnInit() {
    AnimeJsProvider.animateHeader();
    const view = localStorage.getItem('roles');
    const position = localStorage.getItem('position');
    if (view) {
      this.admin = true;
    }
    if (position) {
      this.positionUser = position;
      this.iconByPosition(position);
    }
    this.subscribe_admin = this.adminService.$admin_show.subscribe(value => {
      this.showAdminPage(value);
    });
    this.subscriptionPosition = this.adminService.$user_position.subscribe(position1 => {
      this.positionUser = position1;
      this.iconByPosition(position1);
    });
    this.adminService.$admin_show.subscribe(value => {
      if (!value) {
        this.positionShow = false;
      } else {
        AnimeJsProvider.animeAdminMenu();
      }
    });
    this.addAnimeIcon();
  }

  logout() {
    this.addAnimeIcon();
    this.http.logout();
    this.adminService.$user_position.emit('');
    this.positionShow = false;
  }

  showAdminPage(value) {
    this.addAnimeMenuBox(value);
    this.addAnimeToHelper(value);

  }

  addAnimeToHelper(value) {
    if (value) {
      document.querySelectorAll('.anime-container').forEach(icon => {

        icon.classList.add('animation-icon');
        setTimeout(() => {
          icon.classList.remove('animation-icon');
        }, 1000);
      });
    }

  }

  addAnimeIcon() {
    document.querySelectorAll('a').forEach(icon => {
      icon.addEventListener('mouseenter', (evt => {
        icon.classList.add('flip-scale-up-ver');
        setTimeout(() => {
          icon.classList.remove('flip-scale-up-ver');
        }, 1000);
      }));

    });


  }

  addAnimeMenuBox(value) {
    const menu = document.getElementById('menu-box');
    this.admin = value;
    if (menu) {
      menu.classList?.add('animation-menu-box');
    }

    const timeout = setTimeout(() => {
      menu.classList?.remove('animation-menu-box');
      clearTimeout(timeout);
    }, 2000);
  }

  ngOnDestroy(): void {
    if (this.subscribe_admin) {
      this.subscribe_admin.unsubscribe();
    }
    if (this.subscriptionPosition) {
      this.subscriptionPosition.unsubscribe();
    }
  }

  iconByPosition(position: string): void {

    switch (position) {
      case 'Software Administration': {
        this.star = faStar;
        this.positionShow = true;
        break;
      }
      case 'Manager': {
        this.star = faStar;
        this.positionShow = true;
        break;
      }
      case 'Technic': {
        this.star = faUsersCog;
        this.positionShow = true;
        break;
      }
      default: {
        this.star = faUsersCog;
        this.positionShow = true;
        break;
      }
    }

    AnimeJsProvider.animeTitle();

  }


}
