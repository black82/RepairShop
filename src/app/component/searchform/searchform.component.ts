import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../entity/ClientWeb';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {FormhidenService} from '../service/formhiden.service';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit, OnDestroy {
  search = faSearch;
  @Input()
  textButton: string;
  @Input()
  typeForm: string;
  @Input()
  titleForm: string;
  formInput: FormGroup;
  client: Client;
  @Output()
  actionA: EventEmitter<Client> = new EventEmitter();
  hideSearch = false;
  button: Element;

  constructor(private fb: FormBuilder,
              private client_service: HttpClien,
              private alert_service: AlertServiceService,
              private form_hide_Service: FormhidenService) {
    const nonWhitespaceRegExp: RegExp = new RegExp('\\S');
    this.formInput = this.fb.group({
      ob: new FormControl(null, [Validators.required, Validators.pattern(nonWhitespaceRegExp)])
    });
  }

  ngOnInit() {
    this.form_hide_Service.form_open.subscribe(value => {
      this.hideSearch = value;
    });
    this.hiddenFormAfterSubmitForm();
  }


  submitForm() {
    if (this.formInput.invalid) {
      this.alert_service.warn('',
        'Please fill in the search field, The field cannot be empty.', false, false, '');
      return;
    }
    this.form_hide_Service.id_repair.emit(this.formInput.controls.ob.value);
    switch (this.typeForm) {
      case 'telephone': {
        this.searchByTelephone();
        break;
      }
      case 'id-repair': {
        this.searchByIdRepair();
        break;
      }
      case 'email': {
        this.searchByEmail();
        break;
      }
      case 'repair-id-all': {
        this.searchByRepairIdAll();
      }
    }


  }

  hiddenFormAfterSubmitForm() {
    document.getElementById('show-button').style.opacity = '0';
    const searchButton = document.querySelector('#search-button');
    searchButton.addEventListener('click', () => {
        setTimeout(() => {
          if (this.hideSearch) {
            document.querySelector('form').id = 'form-hide';
            setTimeout(() => {
              this.showSearchForm();
            }, 500);
          }
        }, 500);


      }
    );
  }

  showSearchForm() {
    document.getElementsByClassName('show-form')[0].style.opacity = '1';
    document.querySelector('form').style.display = 'none';
    document.querySelector('.show-form').addEventListener('click', () => {
      (document.querySelector('.show-form') as HTMLElement).style.opacity = '0';
      this.form_hide_Service.form_open.emit(false);
      document.querySelector('form').style.display = 'block';
      document.querySelector('form').id = 'show-form';
    });
  }

  searchByTelephone() {
    this.client_service.searchByTelephoneNumber(this.formInput.controls.ob.value).subscribe(
      client => {
        this.client = client;
        this.actionA.emit(this.client);
      },
      error => {
        this.hideSearch = false;
        this.alert_service.error(null,
          'Unfortunately we could not find this client '
          + this.formInput.controls.ob.value + ' please try with other search data.', false, true, '', error)
        ;
      });
  }

  searchByIdRepair() {
    if (!Number(this.formInput.controls.ob.value)) {
      this.alert_service.info(null, 'The value entered must be a Number.', false, false, null, null);
      return;
    }
    this.client_service.searchByRepairIdAndRepairAcriv(this.formInput.controls.ob.value).subscribe(
      client => {
        this.client = client;
        this.actionA.emit(this.client);
      },
      error => {
        this.hideSearch = false;
        this.alert_service.error(null,
          'Unfortunately we could not find this client '
          + this.formInput.controls.ob.value + ' please try with other search data.', false, true, '', error)
        ;
      });

  }

  searchByRepairIdAll() {
    if (!Number(this.formInput.controls.ob.value)) {
      this.alert_service.info(null, 'The value entered must be a Number.', false, false, null, null);
      return;
    }
    this.client_service.searchByRepairId(this.formInput.controls.ob.value).subscribe(
      client => {
        this.client = client;
        this.actionA.emit(this.client);
      },
      error => {
        this.hideSearch = false;
        this.alert_service.error(null,
          'Unfortunately we could not find this client '
          + this.formInput.controls.ob.value + ' please try with other search data.', false, true, '', error)
        ;
      });

  }

  searchByEmail() {
    this.client_service.searchByEmail(this.formInput.controls.ob.value).subscribe(
      client => {
        this.client = client;
        this.actionA.emit(this.client);
      },
      error => {
        this.hideSearch = false;
        this.alert_service.error(null,
          'Unfortunately we could not find this client '
          + this.formInput.controls.ob.value + ' please try with other search data.', false, true, '', error)
        ;
      });
  }

  ngOnDestroy(): void {
    this.form_hide_Service.form_open.subscribe();
  }
}
