import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Client} from '../entity/ClientWeb';

@Component({
  selector: 'app-searchpage',
  templateUrl: './searchpage.component.html',
  styleUrls: ['./searchpage.component.css']
})
export class SearchpageComponent implements OnInit {
  nameForm = 'Search bay Tel. Number';
  button = 'Search';
  client: Client;
  @Output()
  refresh_client: EventEmitter<Client> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  client_catch($event: Client) {
    if ($event as Client) {
      this.refresh_client.emit($event);
      this.client = $event;
    }
  }
}
