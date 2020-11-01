import {Component, EventEmitter, Input, OnInit} from '@angular/core';
import {faMicrochip} from '@fortawesome/free-solid-svg-icons/faMicrochip';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import {faPhoneSquare, faUserCircle, faUserTag} from '@fortawesome/free-solid-svg-icons';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faUserLock} from '@fortawesome/free-solid-svg-icons/faUserLock';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons/faUnlockAlt';
import {faHatWizard} from '@fortawesome/free-solid-svg-icons/faHatWizard';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faMinusSquare} from '@fortawesome/free-solid-svg-icons/faMinusSquare';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {faMeteor} from '@fortawesome/free-solid-svg-icons/faMeteor';
import {faFileImage} from '@fortawesome/free-solid-svg-icons/faFileImage';
import {Client} from '../entity/ClientWeb';
import {RepairFileStorage} from '../entity/RepairFileStorage';
import {DeviceForSale} from '../entity/DeviceForSale';
import {OutputTest} from '../entity/OutputTest';
import {InputTest} from '../entity/InputTest';
import {InputOutputTestService} from '../service/input-output-test.service';

@Component({
  selector: 'app-singl-device-shouw',
  templateUrl: './singl-device-shouw.component.html',
  styleUrls: ['./singl-device-shouw.component.css']
})
export class SinglDeviceShouwComponent implements OnInit {

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
  devices: DeviceForSale[] = [];
  repairs_element: ElementDeviceForSale[] = [];
  repair_fileStorage: RepairFileStorage;
  @Input()
  refresh: EventEmitter<Client> = new EventEmitter<Client>();
  show_repair = false;
  show_document = false;
  device_show = false;
  element: Element;

  constructor(private inputOutputTestCheck: InputOutputTestService) {
  }

  ngOnInit() {
    if (this.client != null) {
      this.create_client(this.client);
    }
  }

  create_client(client: Client) {
    this.devices_element = [];
    this.repairs_element = [];
    this.devices = client.deviceBay;
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

  create_input_test(deviceForSale: DeviceForSale): ElementDeviceForSale {
    return new ElementDeviceForSale(false, deviceForSale,
      this.check_test_OK(this.client.deviceBay[0].inputTest),
      this.check_test_OK_out(this.client.deviceBay[0].outputTest));

  }

  check_test_OK(inputTest: InputTest): string[] {
    return this.inputOutputTestCheck.inputTestCheck(inputTest);
  }

  check_test_OK_out(outputTest: OutputTest): string[] {
    return this.inputOutputTestCheck.outputTestCheck(outputTest);
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

  showElementRepair(item: ElementDeviceForSale) {
    item.visible = true;
    this.repair_fileStorage = null;
    this.repair_fileStorage = item.deviceForSale.repairFileStorage;
    this.showDocument();
  }
}

class Element {
  visible: boolean;
  divice: DeviceForSale;


  constructor(visible: boolean, divice: DeviceForSale) {
    this.visible = visible;
    this.divice = divice;
  }
}

class ElementDeviceForSale {
  visible: boolean;
  deviceForSale: DeviceForSale;
  test_input: string[];
  test_output: string[];


  constructor(visible: boolean, repair_elemnt: DeviceForSale, test_input: string[],
              test_output: string[]) {
    this.visible = visible;
    this.deviceForSale = repair_elemnt;
    this.test_input = test_input;
    this.test_output = test_output;
  }
}
