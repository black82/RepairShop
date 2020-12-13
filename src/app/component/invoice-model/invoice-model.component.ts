import {Component, OnInit} from '@angular/core';
import {faUserShield} from '@fortawesome/free-solid-svg-icons/faUserShield';
import {HttpClien} from '../service/clientservice.service';

@Component({
  selector: 'app-invoice-model',
  templateUrl: './invoice-model.component.html',
  styleUrls: ['./invoice-model.component.css']
})
export class InvoiceModelComponent implements OnInit {
  adminIcon = faUserShield;
  apiService: string;

  constructor(private httClient: HttpClien) {
  }

  ngOnInit(): void {
    this.apiService = this.httClient.apiUrl;
  }

}
