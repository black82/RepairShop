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
import {InputOutputTestService} from '../service/input-output-test.service';

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

  constructor(private deviceInputService: DeviceInputService, private inputOutputCheck: InputOutputTestService) {
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

  check_test_OK(inputTest: InputTest) {
    this.test_input = [];
    this.test_input = this.inputOutputCheck.inputTestCheck(inputTest);
  }

  check_test_OK_out(outputted: OutputTest) {
    this.test_output = [];
    this.test_output = this.inputOutputCheck.outputTestCheck(outputted);
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
