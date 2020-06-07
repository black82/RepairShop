import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Client} from '../entity/ClientWeb';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {FormhidenService} from '../service/formhiden.service';
import {Subscription} from 'rxjs';

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
  button: Element;
  hidem_show_form_local: EventEmitter<any> = new EventEmitter();
  private show_form: Subscription;

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
    this.show_form = this.hidem_show_form_local.subscribe(() => {
      this.hiddenFormAfterSubmitForm();
    });
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
    document.querySelector('form').id = 'form-hide';
    this.showSearchForm();
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
    const value = this.formInput.controls.ob.value;
    if (!this.phoneValidator(value)) {
      this.alert_service.info(null, 'The value entered must be a Telethon Number.Example: +39123456123', false, false, null, null);
      return;
    }
    this.client_service.searchByTelephoneNumber(this.formInput.controls.ob.value).subscribe(
      client => {
        this.hidem_show_form_local.emit();
        this.client = client;
        this.actionA.emit(this.client);

      },
      error => {
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
    this.client_service.searchByRepairIdAndRepairArhiv(this.formInput.controls.ob.value).subscribe(
      client => {
        this.client = client;
        this.actionA.emit(this.client);
        this.hidem_show_form_local.emit();
      },
      error => {
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
        this.hidem_show_form_local.emit();
      },
      error => {
        this.alert_service.error(null,
          'Unfortunately we could not find this client '
          + this.formInput.controls.ob.value + ' please try with other search data.', false, true, '', error)
        ;
      });

  }

  searchByEmail() {
    const email: string = this.formInput.controls.ob.value;
    if (!this.emailValidator(email)) {
      this.alert_service.info(null, 'The value entered must be a email.', false, false, null, null);
      return;
    }
    this.client_service.searchByEmail(this.formInput.controls.ob.value).subscribe(
      client => {
        this.client = client;
        this.actionA.emit(this.client);
        this.hidem_show_form_local.emit();
      },
      error => {
        this.alert_service.error(null,
          'Unfortunately we could not find this client '
          + this.formInput.controls.ob.value + ' please try with other search data.', false, true, '', error)
        ;
      });
  }

  emailValidator(email: string): boolean {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return EMAIL_REGEXP.test(email);
  }

  phoneValidator(phone: string): boolean {
    const EMAIL_REGEXP = /^[0-9\-\+]{9,15}$/;
    return EMAIL_REGEXP.test(phone);
  }

  ngOnDestroy(): void {
    if (this.show_form) {
      this.show_form.unsubscribe();
    }
  }
}
