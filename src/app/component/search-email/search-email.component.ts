import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {FormhidenService} from '../service/formhiden.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-search-email',
  templateUrl: './search-email.component.html',
  styleUrls: ['./search-email.component.css']
})
export class SearchEmailComponent implements OnInit, OnDestroy {
  nameForm = 'Search by Email';
  button = 'Search Email';
  client: Client;
  show_client: boolean;
  private event_form: Subscription;


  constructor(private hide_form: FormhidenService) {
  }

  ngOnInit() {
    this.event_form = this.hide_form.form_open.subscribe(value => {
      this.show_client = value;
    });
  }

  client_catch($event: Client) {
    if ($event as Client) {
      this.client = $event;
      this.hide_form.form_open.emit(true);
    }
  }

  ngOnDestroy(): void {
    if (this.event_form) {
      this.event_form.unsubscribe();
    }
  }

}

