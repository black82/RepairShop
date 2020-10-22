import {Component, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {DeviceForSale} from '../entity/DeviceForSale';
import {InputTest} from '../entity/InputTest';
import {OutputTest} from '../entity/OutputTest';
import {RepairFileStorage} from '../entity/RepairFileStorage';
import {DeviceForSaleDto} from '../entity/DeviceForSaleDto';
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

@Component({
  selector: 'app-single-divice-forsale',
  templateUrl: './single-device-for-sale.component.html',
  styleUrls: ['./single-device-for-sale.component.css']
})
export class SingleDeviceForSaleComponent implements OnInit {

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
  repairStorage: RepairFileStorage = new RepairFileStorage();
  inputTest: InputTest = new InputTest(1, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
    true, true, true);
  outputTest: OutputTest = new OutputTest(1, true, true, true, true, true, true, true, true, true, true, true, true, true, true,
    true, true, true);
  clint: Client = new Client(12, 'Railean', 'Iurie',
    null, null, null, null, 'asdadsadsad', null, true, false, null, null, 'T-0', 'T -1', null, null);
  clint2: Client = new Client(12, 'Railean', 'iurie',
    null, null, null, null, 'asdadsadsad', null, true, false, null, null, 'T-0', 'T -1', null, null);
  deviceForSale: DeviceForSale = new DeviceForSale(12, 'samsung', 'Smartfon',
    'A+', 'afsafsadsadsadsadsa', '123213', '123', 'dffghg', 'asadasd', 'asdasdsad', 'asadsadsa',
    23, this.inputTest, this.outputTest, this.repairStorage, true, '123', '1234', new Date(), new Date());
  deviceForSaleDto: DeviceForSaleDto = new DeviceForSaleDto(this.clint, this.clint2, this.deviceForSale);
  test_input: string[] = [];
  test_output: string[] = [];

  constructor() {
  }

  ngOnInit(): void {
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
}
