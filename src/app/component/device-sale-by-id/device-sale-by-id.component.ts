import {Component, OnDestroy, OnInit} from '@angular/core';
import {DeviceForSaleTransaction} from '../entity/DeviceForSaleTransaction';
import {DeviceInputService} from '../service/device-input.service';
import {faHistory} from '@fortawesome/free-solid-svg-icons/faHistory';
import {FormhidenService} from '../service/formhiden.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-device-sale-by-id',
  templateUrl: './device-sale-by-id.component.html',
  styleUrls: ['./device-sale-by-id.component.css']
})
export class DeviceSaleByIdComponent implements OnInit, OnDestroy {
  button = 'Device Sale By Id';
  nameForm = 'Search Device to Sale By Id ';
  showClient = false;
  hide_button = faHistory;
  private form_open: Subscription;

  constructor(private deviceInputService: DeviceInputService, private hide_form: FormhidenService) {
  }

  ngOnInit(): void {
    this.form_open = this.hide_form.form_open.subscribe(value => {
      this.showClient = value;
    });
  }

  client_catch(deviceForSaleTransaction: DeviceForSaleTransaction) {
    this.showClient = true;
    const timeout = setTimeout(() => {
      this.deviceInputService.$deviceForSaleClientTransaction.emit(deviceForSaleTransaction);
      clearTimeout(timeout);
    }, 300);

  }

  hideClient() {
    this.showClient = false;
  }

  ngOnDestroy(): void {
    if (this.form_open) {
      this.form_open.unsubscribe();
    }
  }
}
