import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../entity/ClientWeb';
import {HttpClien} from '../service/clientservice.service';
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
  hideSearch = false;
  button: Element;

  constructor(private fb: FormBuilder, private client_service: HttpClien, private alert_service: AlertServiceService) {
    this.formInput = this.fb.group({
      ob: new FormControl(null, Validators.compose([Validators.nullValidator, Validators.pattern(/^((?!\s{2,}).)*$/)]))
    });
  }

  ngOnInit() {
    this.hiddenFormAfterSubmitForm();
  }


  submitForm() {
    if (!this.formInput.valid) {
      this.alert_service.warn('',
        'Please fill in the search field, The field cannot be empty.', false, false, '');
      return;
    }
    this.client_service.searchByTelephoneNumber(this.formInput.controls.ob.value).subscribe(
      client => {
        this.hideSearch = true;
        this.client = client;
        this.actionA.emit(this.client);
      },
      error => {
        this.hideSearch = false;
        console.log(error);
        this.alert_service.error(null,
          'Unfortunately we could not find this client '
          + this.formInput.controls.ob.value + ' please try with other search data.', false, true, '', error)
        ;
      }
    );
  }

  hiddenFormAfterSubmitForm() {
    const showButton = document.querySelector('#show-button');
    this.button = showButton;
    showButton.style.display = 'none';
    const searchButton = document.querySelector('#search-button');
    searchButton.addEventListener('click', evt => {
      document.querySelector('.search_form').style.display = 'none';
      this.showSearchForm();
    });

  }

  showSearchForm() {
    const button = this.button as HTMLElement;
    const formOutput = document.querySelector('.container');
    formOutput.appendChild(button);
    button.style.display = 'flex';
    this.button.addEventListener('click', event => {
      document.querySelector('.search_form').style.display = 'block';
      document.querySelector('.container').removeChild(button);
    });

  }
}
