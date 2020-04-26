import {Component, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {FormhidenService} from '../service/formhiden.service';

@Component({
  selector: 'app-search-email',
  templateUrl: './search-email.component.html',
  styleUrls: ['./search-email.component.css']
})
export class SearchEmailComponent implements OnInit {
  nameForm = 'Search by Email';
  button = 'Search Email';
  client: Client;
  show_client: boolean;


  constructor(private hide_form: FormhidenService) {
  }

  ngOnInit() {
    this.hide_form.form_open.subscribe(value => {
      this.show_client = value;
    });
  }

  client_catch($event: Client) {
    console.log($event);
    if ($event as Client) {
      this.client = $event;
      this.hide_form.form_open.emit(true);
    }
  }
}

