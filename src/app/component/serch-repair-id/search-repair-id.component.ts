import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {FormhidenService} from '../service/formhiden.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search-repair-id',
  templateUrl: './search-repair-id.component.html',
  styleUrls: ['./search-repair-id.component.css']
})
export class SearchRepairIdComponent implements OnInit, OnDestroy {

  button = 'Search';
  client: Client;
  show_content = false;
  nameForm = 'Search by Repair Number(ID)';
  private form_open: Subscription;


  constructor(private hide_form: FormhidenService) {
  }

  ngOnInit() {
    this.form_open = this.hide_form.form_open.subscribe(value => {
      this.show_content = value;
    });
  }

  client_catch($event: Client) {
    if ($event as Client) {
      this.client = $event;
      this.hide_form.form_open.emit(true);
    }
  }

  ngOnDestroy(): void {
    if (this.form_open) {
      this.form_open.unsubscribe();
    }
  }
}
