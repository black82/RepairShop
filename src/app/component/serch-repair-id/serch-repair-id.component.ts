import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {FormhidenService} from '../service/formhiden.service';

@Component({
  selector: 'app-serch-repair-id',
  templateUrl: './serch-repair-id.component.html',
  styleUrls: ['./serch-repair-id.component.css']
})
export class SerchRepairIdComponent implements OnInit, OnDestroy {

  nameForm = 'Search by Reapair Number';
  button = 'Search';
  client: Client;
  show_content = false;


  constructor(private hide_form: FormhidenService) {
  }

  ngOnInit() {
    this.hide_form.form_open.subscribe(value => {
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
    this.hide_form.form_open.unsubscribe();
  }
}
