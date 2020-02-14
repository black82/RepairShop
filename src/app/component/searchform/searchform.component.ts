import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Client} from '../entity/ClientWeb';
import {ClientserviceService} from '../service/clientservice.service';

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

  constructor(private fb: FormBuilder, private client_service: ClientserviceService) {
    this.formInput = this.fb.group({
      ob: new FormControl('')
    });
  }

  ngOnInit() {
  }


  submitForm() {
    this.client_service.searchByTelephoneNumber(this.formInput.controls.ob.value).subscribe(
      clie => {
        this.client = clie;
        console.log(clie);
        this.actionA.emit(this.client);
      },
      error => {
      }
    );
  }
}
