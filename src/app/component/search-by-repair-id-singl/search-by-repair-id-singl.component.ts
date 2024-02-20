import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from "../entity/ClientWeb";
import {Subscription} from "rxjs";
import {FormhidenService} from "../service/formhiden.service";

@Component({
  selector: 'app-search-by-repair-id-singl',
  templateUrl: './search-by-repair-id-singl.component.html',
  styleUrls: ['./search-by-repair-id-singl.component.css']
})
export class SearchByRepairIdSinglComponent implements OnInit, OnDestroy {
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
