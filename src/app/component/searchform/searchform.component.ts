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
  @Output()
  hiddenForm = new EventEmitter();

  constructor(private fb: FormBuilder, private client_service: HttpClien, private alert_service: AlertServiceService) {
    const nonWhitespaceRegExp: RegExp = new RegExp('\\S');
    this.formInput = this.fb.group({
      ob: new FormControl(null, [Validators.required, Validators.pattern(nonWhitespaceRegExp)])
    });
  }

  ngOnInit() {
    this.hiddenFormAfterSubmitForm();
  }


  submitForm() {
    if (this.formInput.invalid) {
      this.alert_service.warn('',
        'Please fill in the search field, The field cannot be empty.', false, false, '');
      return;
    }
    this.client_service.searchByTelephoneNumber(this.formInput.controls.ob.value).subscribe(
      client => {
        console.log('suces')
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
    document.getElementById('show-button').style.opacity = '0';
    const searchButton = document.querySelector('#search-button');
    console.log('111asdasda');
    searchButton.addEventListener('click', () => {
      if (this.hideSearch) {
        console.log('asdasda');
        document.querySelector('form').id = 'form-hide';
        setTimeout(this.showSearchForm, 1000);
      }
    });

  }

  showSearchForm() {
    document.getElementById('show-button').style.opacity = '1';
    document.querySelector('form').style.display = 'none';
    document.querySelector('#show-button').addEventListener('click', () => {
      document.querySelector('form').style.display = 'block';
      document.querySelector('form').id = 'show-form';
      document.getElementById('show-button').style.opacity = '0';
      setTimeout(() => {
        this.hiddenForm?.emit(true);
        this.actionA?.emit(null);
      }, 1000);

    });
  }
}
