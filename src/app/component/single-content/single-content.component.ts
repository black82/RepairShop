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
    const name_test_entre: string[] = [];

    if (!client.device[0].repairs[0].inputModule.camera_input) {
      name_test_entre.push(' X Fotocamera difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.bluetooth) {
      name_test_entre.push(' X Bluetooh difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.vibrations) {
     name_test_entre.push(' X Vibrations difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.audio_equipment) {
      name_test_entre.push(' X Audio difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.software) {
      name_test_entre.push(' X Software difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.keyboard_input) {
      name_test_entre.push(' X La tastiera è danneggiata ');
    }
    if (!client.device[0].repairs[0].inputModule.sim_input) {
      name_test_entre.push(' X La scheda SIM è danneggiata o assente ');
    }
    if (!client.device[0].repairs[0].inputModule.microphone_input) {
      name_test_entre.push(' X Microfono difettoso ');
    }
    if (!client.device[0].repairs[0].inputModule.wi_fi_input) {
      name_test_entre.push(' X Il connettore Wi-Fi è difettoso ');
    }
    if (!client.device[0].repairs[0].inputModule.touch_input) {
      name_test_entre.push(' X Il sensore Touch è difettoso ');
    }
    if (!client.device[0].repairs[0].inputModule.sound_equipment_input) {
      name_test_entre.push(' X L\'apparecchiatura audio è difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.camera_input_front) {
      name_test_entre.push(' X Fotocamera Frontale difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.connectors_input) {
      name_test_entre.push(' X I Connettori del dispositivo sono difettosi ');
    }
    if (!client.device[0].repairs[0].inputModule.display_input) {
      name_test_entre.push(' X Il display del dispositivo è danneggiato ');
    }
    if (!client.device[0].repairs[0].inputModule.sensors_input) {
      name_test_entre.push(' X Il sensore del dispositivo è danneggiato ');
    }
    if (!client.device[0].repairs[0].inputModule.display_touch_input) {
      name_test_entre.push(' X Il display_touchy del dispositivo è danneggiato ');
    }
    return name_test_entre;
  }

  check_test_OK_out(client: Client): string[] {
    const name_test_out: string[] = [];
    if (!client.device[0].rightNowInRepair) {
      if (!client.device[0].repairs[0].outputTest.camera_Output) {
        name_test_out.push(' X Fotocamera difettosa ');
      }
      if (!client.device[0].repairs[0].outputTest.audio_equipment) {
        name_test_out.push(' X Speaker difettosa ');
      }
      if (!client.device[0].repairs[0].outputTest.software) {
        name_test_out.push(' X Software difettosa ');
      }
      if (!client.device[0].repairs[0].outputTest.vibrations) {
        name_test_out.push(' X Vibrations difettosa ');
      }
      if (!client.device[0].repairs[0].outputTest.bluetooth) {
        name_test_out.push(' X Bluetooh difettosa ');
      }
      if (!client.device[0].repairs[0].outputTest.camera_Output_Front) {
        name_test_out.push(' X Fotocamera Frontale difettosa ');
      }
      if (!client.device[0].repairs[0].outputTest.keyboard_Output) {
        name_test_out.push(' X La tastiera è danneggiata ');
      }
      if (!client.device[0].repairs[0].outputTest.sim_Output) {
        name_test_out.push(' X La scheda SIM è danneggiata o assente ');
      }
      if (!client.device[0].repairs[0].outputTest.microphone_Output) {
        name_test_out.push(' X Microfono difettoso ');
      }
      if (!client.device[0].repairs[0].outputTest.wi_fi_Output) {
        name_test_out.push(' X Il connettore Wi-Fi è difettoso ');
      }
      if (!client.device[0].repairs[0].outputTest.touch_Output) {
        name_test_out.push(' X Il sensore Touch è difettoso ');
      }
      if (!client.device[0].repairs[0].outputTest.sound_equipment_Output) {
        name_test_out.push(' X L\'apparecchiatura audio è difettosa ');
      }
      if (!client.device[0].repairs[0].outputTest.connectors_Output) {
        name_test_out.push(' X I Connettori del dispositivo sono difettosi ');
      }
      if (!client.device[0].repairs[0].outputTest.display_Output) {
        name_test_out.push(' X Il display del dispositivo è danneggiato ');
      }
      if (!client.device[0].repairs[0].outputTest.sensors_Output) {
        name_test_out.push(' X Il sensore del dispositivo è danneggiato ');
      }
      if (!client.device[0].repairs[0].outputTest.display_touch_Output) {
        name_test_out.push(' X Il display_touchy del dispositivo è danneggiato ');
      }
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

  showElementRepair(item: ElementRepair) {
    item.visible = true;
    this.repair_fileStorage = null;
    this.repair_fileStorage = item.repair_elemnt.repairFileStorage;
    this.showDocument();
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
