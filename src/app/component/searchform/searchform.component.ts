import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Client} from '../entity/ClientWeb';
import {ClientserviceService} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
  search = faSearch;
  @Input()
  textButton: string;
  @Input()
  titleForm: string;
  formInput: FormGroup;
  client: Client;
  @Output()
  actionA: EventEmitter<Client> = new EventEmitter();

  constructor(private fb: FormBuilder, private client_service: ClientserviceService, private alert_service: AlertServiceService) {
    this.formInput = this.fb.group({
      ob: new FormControl('')
    });
  }

  ngOnInit() {
  }


  submitForm() {
    this.client_service.searchByTelephoneNumber(this.formInput.controls.ob.value).subscribe(
      client => {
        this.client = client;
        this.actionA.emit(this.client);
      },
      error => {
        this.alert_service.error(null,
          'Unfortunately we could not find this client '
          + this.formInput.controls.ob.value + ' please try with other search data.', false, true, '', error)
        ;
      }
    );
  }
}
