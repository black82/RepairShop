import {Component, Input, OnInit} from '@angular/core';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faUserLock} from '@fortawesome/free-solid-svg-icons/faUserLock';
import {faPhoneSquare, faUserCircle, faUserTag} from '@fortawesome/free-solid-svg-icons';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons/faUnlockAlt';
import {faHatWizard} from '@fortawesome/free-solid-svg-icons/faHatWizard';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {faMicrochip} from '@fortawesome/free-solid-svg-icons/faMicrochip';
import {Client} from '../entity/ClientWeb';
import {Device} from '../entity/Device';
import {Repair} from '../entity/Repair';
import {faMinusSquare} from '@fortawesome/free-solid-svg-icons/faMinusSquare';
import {faMeteor} from '@fortawesome/free-solid-svg-icons/faMeteor';
import {faFileImage} from '@fortawesome/free-solid-svg-icons/faFileImage';
import {RepairFileStorage} from '../entity/RepairFileStorage';
import {InputOutputTestService} from '../service/input-output-test.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {HttpClien} from '../service/clientservice.service';

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
  userStaff = faUserCircle;
  cogs = faCogs;
  address = faAddressCard;
  date = faCalendarPlus;
  code = faUserLock;
  usertag = faUserTag;
  phone = faPhoneSquare;
  password = faUnlockAlt;
  accessory = faHatWizard;
  display = faMobileAlt;
  test_minus = faMinusSquare;
  text = faEnvelopeOpenText;
  work = faTools;
  test_meteor = faMeteor;
  images_icon = faFileImage;
  @Input()
  client: Client;
  devices_element: Element[] = [];
  devices: Device[] = [];
  repairs_element: ElementRepair[] = [];
  repair_fileStorage: RepairFileStorage;
  show_repair = false;
  show_document = false;
  device_show = false;
  element: Element;

  constructor(private inputOutputCheckTest: InputOutputTestService,
              private animeService: AnimeServiceService,
              private httpService: HttpClien) {
  }

  ngOnInit() {
    if (this.client != null) {
      this.create_client(this.client);
    }
  }

  create_client(client: Client) {
    this.devices_element = [];
    this.repairs_element = [];
    this.devices = client.device;
    this.devices.map(s => this.devices_element.push(new Element(false, s)));
  }

  showElement(element) {
    this.repairs_element = [];
    element.visible = !element.visible;
    element.divice.repairs.forEach(repair => {
      const elementRepair = this.create_input_test(repair);
      elementRepair.visible = false;
      this.repairs_element.push(elementRepair);
    });
    this.deviceShow();
  }


  deviceShow() {
    this.device_show = !this.device_show;
    this.showRepair();
  }

  showRepair() {
    this.show_repair = !this.show_repair;
    if (this.show_document) {
      this.showDocument();
    }

  }

  showDocument() {
    this.show_document = !this.show_document;
  }

  create_input_test(repaired: Repair): ElementRepair {
    return new ElementRepair(false, repaired, this.check_test_OK(this.client), this.check_test_OK_out(this.client));
  }

  check_test_OK(client: Client): string[] {
    return this.inputOutputCheckTest.inputTestCheck(client.device[0].repairs[0].inputModule);
  }

  check_test_OK_out(client: Client): string[] {
    if (!client.device[0].repairs[0].nowInRepair) {
      return this.inputOutputCheckTest.outputTestCheck(client.device[0].repairs[0].outputTest);
    } else {
      return [];
    }
  }

  zoum($event, i: number) {
    const htmlImageElement = document.getElementsByClassName(`${i}-image`);
    const image = htmlImageElement[0] as HTMLImageElement;
    if (image?.id !== 'zoom') {
      image.id = 'zoom';
    } else {
      image.id = 'normal-zoom';
    }
  }

  open_popup(url: string) {
    window.open(url, 'Invoice', 'width=400px,height=500px');
  }

  showElementRepair(item: ElementRepair) {
    item.visible = true;
    this.repair_fileStorage = null;
    this.repair_fileStorage = item.repair_elemnt.repairFileStorage;
    this.showDocument();
  }

  showStaffUser(user_nick_name: string) {
    this.animeService.$anime_show.emit(true);
    this.httpService.isAdminByNickName(user_nick_name).subscribe(user => {
      this.animeService.$show_user.emit(user);
    }, () => {
      this.animeService.$anime_show.emit(false);
    });
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
  test_input: string[];
  test_output: string[];


  constructor(visible: boolean, repair_elemnt: Repair, test_input: string[], test_output: string[]) {
    this.visible = visible;
    this.repair_elemnt = repair_elemnt;
    this.test_input = test_input;
    this.test_output = test_output;
  }
}
