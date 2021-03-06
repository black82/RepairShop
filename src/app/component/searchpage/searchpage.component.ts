import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {FormhidenService} from '../service/formhiden.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit, OnDestroy {

  nameForm = 'Search by Tel. Number';
  button = 'Search';
  client: Client;
  show_content = false;
  form_open: Subscription;

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
