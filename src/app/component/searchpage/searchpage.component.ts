import {Component, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {FormhidenService} from '../service/formhiden.service';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  nameForm = 'Search bay Tel. Number';
  button = 'Search';
  client: Client;


  constructor(private hide_form: FormhidenService) {
  }

  ngOnInit() {

  }

  client_catch($event: Client) {
    console.log($event);
    if ($event as Client) {
      this.client = $event;
      this.hide_form.form_open.emit(true);
    }
  }
}
