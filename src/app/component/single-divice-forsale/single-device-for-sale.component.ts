import {Component, OnDestroy, OnInit} from '@angular/core';
import {InputTest} from '../entity/InputTest';
import {OutputTest} from '../entity/OutputTest';
import {DeviceForSaleTransaction} from '../entity/DeviceForSaleTransaction';
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
import {DeviceInputService} from '../service/device-input.service';
import {Subscription} from 'rxjs';
import {Client} from '../entity/ClientWeb';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import {faHistory} from '@fortawesome/free-solid-svg-icons/faHistory';

@Component({
  selector: 'app-single-divice-forsale',
  templateUrl: './single-device-for-sale.component.html',
  styleUrls: ['./single-device-for-sale.component.css']
})
export class SingleDeviceForSaleComponent implements OnInit, OnDestroy {
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
  shows_button = faAngleDoubleRight;
  client: Client;
  showClientRepair = false;
  hide_button = faHistory;
  deviceForSaleDto: DeviceForSaleTransaction;
  test_output: string[] = [];
  test_input: any[] = [];
  showDevice = false;
  private subscription: Subscription;

  constructor(private deviceInputService: DeviceInputService) {
  }

  ngOnInit(): void {
    this.subscription = this.deviceInputService.$deviceForSaleClientTransaction.subscribe(deviceForSale => {
      this.client_catch(deviceForSale);
    });
  }

  open_popup(url: string) {
    window.open(url, 'Invoice', 'width=400px,height=500px');
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

  check_test_OK(client: InputTest) {
    this.test_input = [];
    if (!client.camera_input) {
      this.test_input.push('X Fotocamera');
    }
    if (!client.bluetooth) {
      this.test_input.push('X Bluetooh');
    }
    if (!client.vibrations) {
      this.test_input.push('X Vibrations');
    }
    if (!client.audio_equipment) {
      this.test_input.push('X Audio');
    }
    if (!client.software) {
      this.test_input.push('X Software');
    }
    if (!client.keyboard_input) {
      this.test_input.push('X La tastiera');
    }
    if (!client.sim_input) {
      this.test_input.push('X SIM danneggiata/assente ');
    }
    if (!client.microphone_input) {
      this.test_input.push('X Microfono');
    }
    if (!client.wi_fi_input) {
      this.test_input.push('X Wi-Fi');
    }
    if (!client.touch_input) {
      this.test_input.push('X Touch');
    }
    if (!client.sound_equipment_input) {
      this.test_input.push('X L\'apparecchiatura audio');
    }
    if (!client.camera_input_front) {
      this.test_input.push('X Fotocamera Frontale');
    }
    if (!client.connectors_input) {
      this.test_input.push('X Connettori');
    }
    if (!client.display_input) {
      this.test_input.push('X Display');
    }
    if (!client.sensors_input) {
      this.test_input.push('X Sensore');
    }
    if (!client.display_touch_input) {
      this.test_input.push('X Display_touchy');
    }
    if (!client.faceIdInput) {
      this.test_input.push('X Face Id');
    }
  }

  check_test_OK_out(outputted: OutputTest) {
    this.test_output = [];
    if (!outputted.camera_Output) {
      this.test_output.push('X Fotocamera');
    }
    if (!outputted.audio_equipment) {
      this.test_output.push('X Speaker');
    }
    if (!outputted.software) {
      this.test_output.push('X Software');
    }
    if (!outputted.vibrations) {
      this.test_output.push('X Vibrations');
    }
    if (!outputted.bluetooth) {
      this.test_output.push('X Bluetooh');
    }
    if (!outputted.camera_Output_Front) {
      this.test_output.push('X Fotocamera Frontale');
    }
    if (!outputted.keyboard_Output) {
      this.test_output.push('X Tastiera ');
    }
    if (!outputted.sim_Output) {
      this.test_output.push('X SIM è danneggiata/assente ');
    }
    if (!outputted.microphone_Output) {
      this.test_output.push('X Microfono');
    }
    if (!outputted.wi_fi_Output) {
      this.test_output.push('X Wi-Fi');
    }
    if (!outputted.touch_Output) {
      this.test_output.push('X Sensore Touch');
    }
    if (!outputted.sound_equipment_Output) {
      this.test_output.push('X L\'apparecchiatura audio');
    }
    if (!outputted.connectors_Output) {
      this.test_output.push('X Connettori');
    }
    if (!outputted.display_Output) {
      this.test_output.push('X Display  ');
    }
    if (!outputted.sensors_Output) {
      this.test_output.push('X Sensore ');
    }
    if (!outputted.display_touch_Output) {
      this.test_output.push('X Display_touchy');
    }
    if (!outputted.faceIdOutput) {
      this.test_output.push('X Face Id  danneggiato ');
    }
  }

  client_catch(device: DeviceForSaleTransaction) {
    this.deviceForSaleDto = device;
    this.check_test_OK(this.deviceForSaleDto.deviceForSale.inputTest);
    if (device.deviceForSale.isSaled) {
      this.check_test_OK_out(this.deviceForSaleDto.deviceForSale.outputTest);
    }
    this.showDevice = true;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  showsBayingClientRepair(clientBaying: Client) {
    this.client = null;
    this.client = clientBaying;
    this.showClientRepair = true;
  }

  showsSailingClientRepair(clientSailing: Client) {
    this.client = null;
    this.client = clientSailing;
    this.showClientRepair = true;
  }

  hideClient() {
    this.showClientRepair = false;
  }
}
