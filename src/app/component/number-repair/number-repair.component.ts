import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertServiceService} from '../service/alert-service.service';
import {PrintService} from '../service/print.service';
import {Subscription} from 'rxjs';
import {faCheckSquare} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-number-repair',
  templateUrl: './number-repair.component.html',
  styleUrls: ['./number-repair.component.css']
})
export class NumberRepairComponent implements OnInit, OnDestroy {

  id: number;
  showPopup = false;
  private subscription: Subscription;
  check = faCheckSquare;

  constructor(private alert_service: AlertServiceService,
              private print: PrintService) {
  }

  ngOnInit(): void {
    this.subscription = this.print.$success_print_id.subscribe(id => {
      this.id = id;
      this.showPopup = true;
    });
  }

  close() {
    this.showPopup = false;
    this.alert_service.success(null, 'The client ' +
      'received a device and create the repair procedure !!! Repair Id :'
      + this.id.toString().toUpperCase(), true, null, '');
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
