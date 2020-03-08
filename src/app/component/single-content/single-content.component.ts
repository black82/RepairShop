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
  text_note = faEnvelopeOpenText;
  @Input()
  client: Client;
  devices_element: Element[] = [];
  devices: Device[] = [];
  repairs_element: ElementRepair[] = [];
  @Input()
  refresh: EventEmitter<Client> = new EventEmitter<Client>();


  constructor() {
  }

  ngOnInit() {
    if (this.client != null) {
      this.create_client(this.client);
    }
    this.refresh.subscribe(data => {
      this.create_client(data);
    });
  }

  create_client(client: Client) {
    this.devices_element = [];
    this.repairs_element = [];
    this.devices = client.device;
    this.devices.map(s => this.devices_element.push(new Element(false, s)));
    this.devices.forEach(device => {
        device.repairs.forEach(repair =>
          this.repairs_element.push(this.create_input_test(repair)));
      }
    );
  }

  showElement(element) {
    element.visible = !element.visible;
  }

  create_input_test(repaired: Repair): ElementRepair {
    const value_test_input: boolean[] = [];
    value_test_input.push(repaired.inputModule.camera_input);
    value_test_input.push(repaired.inputModule.keyboard_input);
    value_test_input.push(repaired.inputModule.sim_input);
    value_test_input.push(repaired.inputModule.microphone_input);
    value_test_input.push(repaired.inputModule.wi_fi_input);
    value_test_input.push(repaired.inputModule.touch_input);
    value_test_input.push(repaired.inputModule.sound_equipment_input);
    value_test_input.push(repaired.inputModule.connectors_input);
    value_test_input.push(repaired.inputModule.display_input);
    value_test_input.push(repaired.inputModule.sensors_input);

    const valuie_test_output = this.create_output_test_name(repaired);

    return new ElementRepair(false, repaired, this.check_test_OK(value_test_input), this.check_test_OK(valuie_test_output));
  }

  create_output_test_name(repaired: Repair): boolean [] {
    const value = [];
    if (repaired.nowInRepair) {
      value.length = 11;
      return value;
    }
    value.push(repaired.outputTest?.camera_Output);
    value.push(repaired.outputTest?.keyboard_Output);
    value.push(repaired.outputTest?.sim_Output);
    value.push(repaired.outputTest?.microphone_Output);
    value.push(repaired.outputTest?.wi_fi_Output);
    value.push(repaired.outputTest?.touch_Output);
    value.push(repaired.outputTest?.sound_equipment_Output);
    value.push(repaired.outputTest?.connectors_Output);
    value.push(repaired.outputTest?.display_Output);
    value.push(repaired.outputTest?.sensors_Output);
    return value;
  }

  check_test_OK(test: boolean[]): string[] {
    const test_result = [];
    if (test.length === 11) {
      test_result.length = 11;
      return test_result;
    }
    console.log(test);
    if (!test[0]) {
      test_result.push(' Fotocamera difettosa');
    }
    if (!test[1]) {
      test_result.push(' La tastiera è danneggiata');
    }
    if (!test[2]) {
      test_result.push(' La scheda SIM è danneggiata o assente');
    }
    if (!test[3]) {
      test_result.push(' Microfono difettoso');
    }
    if (!test[4]) {
      test_result.push(' Il connettore Wi-Fi è difettoso');
    }
    if (!test[5]) {
      test_result.push(' Il sensore Touch è difettoso');
    }
    if (!test[6]) {
      test_result.push(' L\'apparecchiatura audio è difettosa');
    }
    if (!test[7]) {
      test_result.push(' I Connettori del dispositivo sono difettosi');
    }
    if (!test[8]) {
      test_result.push(' Il display del dispositivo è danneggiato');
    }
    if (!test[9]) {
      test_result.push(' Il sensore del dispositivo è danneggiato');
    }
    console.log(test_result);
    return test_result;
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
