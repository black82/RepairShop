import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertServiceService} from '../service/alert-service.service';
import {PrintService} from '../service/print.service';
import {Client} from '../entity/ClientWeb';
import {Subscription} from 'rxjs';
import {faCheckSquare} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-number-repair',
  templateUrl: './number-repair.component.html',
  styleUrls: ['./number-repair.component.css']
})
export class NumberRepairComponent implements OnInit, OnDestroy {

  client: Client;
  showPopup = false;
  private subscription: Subscription;
  check = faCheckSquare;

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
    this.alert_service.success(null, 'The client ' + this.getNameByTypeClient(this.client) +
      'received a device and create the repair procedure !!! Repair Id :'
      + this.client.device[0].repairs[0].repair_Id.toString().toUpperCase(), true, null, '');
  }

  getNameByTypeClient(client: Client): string {
    if (client.typeClient) {
      return client.companyName.toUpperCase();
    } else {
      return client.name.toUpperCase() + ' ' + client.family.toUpperCase();
    }
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
