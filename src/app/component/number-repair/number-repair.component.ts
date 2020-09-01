import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertServiceService} from '../service/alert-service.service';
import {PrintService} from '../service/print.service';
import {Client} from '../entity/ClientWeb';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-number-repair',
  templateUrl: './number-repair.component.html',
  styleUrls: ['./number-repair.component.css']
})
export class NumberRepairComponent implements OnInit, OnDestroy {

  client: Client;
  showPopup = false;
  private subscription: Subscription;

  constructor(private alert_service: AlertServiceService,
              private print: PrintService) {
  }

  ngOnInit(): void {
    this.subscription = this.print.$success_print_id.subscribe(client => {
      this.client = client;
      this.showPopup = true;
    });
  }

  close() {
    this.showPopup = false;
    this.alert_service.success(null, 'The client ' + this.client.name.toUpperCase() +
      'received a device and create the repair procedure !!! Repair Id :'
      + this.client.device[0].repairs[0].repair_Id.toString().toUpperCase(), true, null, '');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
