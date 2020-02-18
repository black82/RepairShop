import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Client} from '../entity/ClientWeb';
import {ClientserviceService} from '../service/clientservice.service';
import {HttpErrorResponse} from '@angular/common/http';

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
  private type_alert: string;
  private error: HttpErrorResponse;
  private show_alert: boolean;
  private message_alert: string;

  constructor(private fb: FormBuilder, private client_service: ClientserviceService) {
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
        if (error as HttpErrorResponse && error.code <= 500 && error.status >= 400) {
          this.show_alert_function(true, 'warn', 'Unfortunately we could not find this client '
            + this.formInput.controls.ob.value + ' please try with other search data.', error);
        }
        if (error as HttpErrorResponse && error.code >= 500) {
          this.show_alert_function(true, 'error',
            'I\'m sorry something went wrong. Try or contact Email Application Support blackrailean@gmail.com.', error);
        }
      }
    );
  }

  show_alert_function(show_alert: boolean, type_alert: string, message_alert: string, error_alert: HttpErrorResponse) {
    console.log(type_alert, message_alert, show_alert);
    this.error = error_alert;
    this.show_alert = show_alert;
    this.type_alert = type_alert;
    this.message_alert = message_alert;
  }


  close_alert() {
    this.show_alert = !this.show_alert;
  }
}
