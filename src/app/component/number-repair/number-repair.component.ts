import {Component, OnDestroy, OnInit} from '@angular/core';
import {AlertServiceService} from '../service/alert-service.service';
import {PrintService} from '../service/print.service';
import {Subscription} from 'rxjs';
import {faDatabase, faSmileWink} from '@fortawesome/free-solid-svg-icons';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';

@Component({
  selector: 'app-number-repair',
  templateUrl: './number-repair.component.html',
  styleUrls: ['./number-repair.component.css']
})
export class NumberRepairComponent implements OnInit, OnDestroy {

  id: number;
  showPopup = false;
  private subscription: Subscription;
  check = faDatabase;
  smile = faSmileWink;
  buttonIcon = faCheckCircle;

  constructor(private alert_service: AlertServiceService,
              private print: PrintService) {
  }

  ngOnInit(): void {
    this.subscription = this.print.$success_print_id.subscribe(id => {
      this.id = null;
      this.id = id;
      this.showPopup = true;
    });
  }

  close() {
    const idTemp = this.id;
    this.id = null;
    this.showPopup = false;
    this.alert_service.success(null, 'The procedure was successfully completed id is : '
      + idTemp, true, null, '');
  }


  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
