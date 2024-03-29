import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Client} from '../entity/ClientWeb';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {FormhidenService} from '../service/formhiden.service';
import {Subscription} from 'rxjs';
import {Repair} from '../entity/Repair';
import {DeviceForSaleTransaction} from '../entity/DeviceForSaleTransaction';

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
  formInput: UntypedFormGroup;
  client: Client;
  @Output()
  actionA: EventEmitter<Client> = new EventEmitter();
  @Output()
  actionB: EventEmitter<Repair> = new EventEmitter();
  @Output()
  actionC: EventEmitter<DeviceForSaleTransaction> = new EventEmitter();
  button: Element;
  hidem_show_form_local: EventEmitter<any> = new EventEmitter();
  private show_form: Subscription;

  constructor(private fb: UntypedFormBuilder,
              private client_service: HttpClien,
              private alert_service: AlertServiceService,
              private form_hide_Service: FormhidenService) {
    const nonWhitespaceRegExp: RegExp = new RegExp('\\S');
    this.formInput = this.fb.group({
      ob: new UntypedFormControl(null, [Validators.required, Validators.pattern(nonWhitespaceRegExp)])
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
        break;
      }
      case 'repair-id-extend': {
        this.searchRepairByIdRepair();
        break;
      }
      case 'device-imei': {
        this.searchByImei();
        break;
      }
      case 'single-repair-id': {
        this.searchSingleRepairById();
        break;
      }
      case 'single-device-sale': {
        this.searchDeviceSaleById();
      }
    }


  }

  hiddenFormAfterSubmitForm() {
    const elementById = document.getElementById('show-button');
    if (elementById) {
      elementById.style.opacity = '0';
      document.querySelector('form').id = 'form-hide';
      this.showSearchForm();
    } else {
      const timeout = setTimeout(() => {
        clearTimeout(timeout);
      }, 300);
    }
  }

  showSearchForm() {
    (document.getElementsByClassName('show-form')[0] as HTMLElement).style.opacity = '1';
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
      this.alert_service.info(null, 'The value entered must be a Phone Number.Example: +39123456123', false, false, null, null);
      return;
    }
    this.client_service.searchByTelephoneNumber(this.formInput.controls.ob.value).subscribe(
      client => {
        this.hidem_show_form_local.emit();
        this.client = client;
        this.actionA.emit(this.client);

      },
      () => {

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
      () => {
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
      () => {

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
      () => {

      });
  }

  searchRepairByIdRepair() {
    if (!Number(this.formInput.controls.ob.value)) {
      this.alert_service.info(null, 'The value entered must be a Number.', false, false, null, null);
      return;
    }
    this.client_service.searchRepairByRepairId(this.formInput.controls.ob.value).subscribe(
      repair => {
        this.actionB.emit(repair);
        this.hidem_show_form_local.emit();
      },
      () => {
      });

  }

  searchSingleRepairById() {
    if (!Number(this.formInput.controls.ob.value)) {
      this.alert_service.info(null, 'The value entered must be a Number.', false, false, null, null);
      return;
    }
    this.client_service.getClientSingleRepair(this.formInput.controls.ob.value).subscribe(
      client => {
        this.actionA.emit(client);
        this.hidem_show_form_local.emit();
      },
      () => {

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

  private searchByImei() {
    if (this.formInput.invalid) {
      this.alert_service.info(null, 'The value entered must be invalid', false, false, null, null);
      return;
    }
    this.client_service.searchByTImei(this.formInput.controls.ob.value).subscribe(
      client => {
        this.hidem_show_form_local.emit();
        this.client = client;
        this.actionA.emit(this.client);

      });
  }

  private searchDeviceSaleById(): void {
    if (!Number(this.formInput.controls.ob.value)) {
      this.alert_service.info(null, 'The value entered must be a Number.', false, false, null, null);
      return;
    }
    this.client_service.getDeviceForSaleById(this.formInput.controls.ob.value).subscribe(
      deviceSaleDto => {
        this.actionC.emit(deviceSaleDto);
        this.hidem_show_form_local.emit();
      },
      () => {

      });
  }
}
