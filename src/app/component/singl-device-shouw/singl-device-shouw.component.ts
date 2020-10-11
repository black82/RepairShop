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

  constructor() {
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
    const name_test_entre: string[] = [];

    if (!inputTest.camera_input) {
      name_test_entre.push(' X Fotocamera difettosa ');
    }
    if (!inputTest.bluetooth) {
      name_test_entre.push(' X Bluetooh difettosa ');
    }
    if (!inputTest.vibrations) {
      name_test_entre.push(' X Vibrations difettosa ');
    }
    if (!inputTest.audio_equipment) {
      name_test_entre.push(' X Audio difettosa ');
    }
    if (!inputTest.software) {
      name_test_entre.push(' X Software difettosa ');
    }
    if (!inputTest.keyboard_input) {
      name_test_entre.push(' X La tastiera è danneggiata ');
    }
    if (!inputTest.sim_input) {
      name_test_entre.push(' X La scheda SIM è danneggiata o assente ');
    }
    if (!inputTest.microphone_input) {
      name_test_entre.push(' X Microfono difettoso ');
    }
    if (!inputTest.wi_fi_input) {
      name_test_entre.push(' X Il connettore Wi-Fi è difettoso ');
    }
    if (!inputTest.touch_input) {
      name_test_entre.push(' X Il sensore Touch è difettoso ');
    }
    if (!inputTest.sound_equipment_input) {
      name_test_entre.push(' X L\'apparecchiatura audio è difettosa ');
    }
    if (!inputTest.camera_input_front) {
      name_test_entre.push(' X Fotocamera Frontale difettosa ');
    }
    if (!inputTest.connectors_input) {
      name_test_entre.push(' X I Connettori del dispositivo sono difettosi ');
    }
    if (!inputTest.display_input) {
      name_test_entre.push(' X Il display del dispositivo è danneggiato ');
    }
    if (!inputTest.sensors_input) {
      name_test_entre.push(' X Il sensore del dispositivo è danneggiato ');
    }
    if (!inputTest.display_touch_input) {
      name_test_entre.push(' X Il display_touchy del dispositivo è danneggiato ');
    }
    return name_test_entre;
  }

  check_test_OK_out(client: OutputTest): string[] {
    const name_test_out: string[] = [];

    if (!client.camera_Output) {
      name_test_out.push(' X Fotocamera difettosa ');
    }
    if (!client.audio_equipment) {
      name_test_out.push(' X Speaker difettosa ');
    }
    if (!client.software) {
      name_test_out.push(' X Software difettosa ');
    }
    if (!client.vibrations) {
      name_test_out.push(' X Vibrations difettosa ');
    }
    if (!client.bluetooth) {
      name_test_out.push(' X Bluetooh difettosa ');
    }
    if (!client.camera_Output_Front) {
      name_test_out.push(' X Fotocamera Frontale difettosa ');
    }
    if (!client.keyboard_Output) {
      name_test_out.push(' X La tastiera è danneggiata ');
    }
    if (!client.sim_Output) {
      name_test_out.push(' X La scheda SIM è danneggiata o assente ');
    }
    if (!client.microphone_Output) {
      name_test_out.push(' X Microfono difettoso ');
    }
    if (!client.wi_fi_Output) {
      name_test_out.push(' X Il connettore Wi-Fi è difettoso ');
    }
    if (!client.touch_Output) {
      name_test_out.push(' X Il sensore Touch è difettoso ');
    }
    if (!client.sound_equipment_Output) {
      name_test_out.push(' X L\'apparecchiatura audio è difettosa ');
    }
    if (!client.connectors_Output) {
      name_test_out.push(' X I Connettori del dispositivo sono difettosi ');
    }
    if (!client.display_Output) {
      name_test_out.push(' X Il display del dispositivo è danneggiato ');
    }
    if (!client.sensors_Output) {
      name_test_out.push(' X Il sensore del dispositivo è danneggiato ');
    }
    if (!client.display_touch_Output) {
      name_test_out.push(' X Il display_touchy del dispositivo è danneggiato ');
    }

    return name_test_out;
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
