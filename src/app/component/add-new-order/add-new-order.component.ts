import {Component, OnDestroy, OnInit} from '@angular/core';
import {faDesktop} from '@fortawesome/free-solid-svg-icons/faDesktop';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons/faHandHoldingUsd';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faHouseDamage} from '@fortawesome/free-solid-svg-icons/faHouseDamage';
import {faDelicious} from '@fortawesome/free-brands-svg-icons/faDelicious';
import {faUserLock} from '@fortawesome/free-solid-svg-icons/faUserLock';
import {faUserSecret} from '@fortawesome/free-solid-svg-icons/faUserSecret';
import {faUserCheck} from '@fortawesome/free-solid-svg-icons/faUserCheck';
import {faUserGraduate} from '@fortawesome/free-solid-svg-icons/faUserGraduate';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faCode} from '@fortawesome/free-solid-svg-icons/faCode';
import {faCircle, faFileSignature, faFlushed, faPaperclip, faPhoneSquare, faVihara} from '@fortawesome/free-solid-svg-icons';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
import {faMoneyCheck} from '@fortawesome/free-solid-svg-icons/faMoneyCheck';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons/faUnlockAlt';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons/faClipboardList';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faBluetooth} from '@fortawesome/free-brands-svg-icons/faBluetooth';
import {faDigitalTachograph} from '@fortawesome/free-solid-svg-icons/faDigitalTachograph';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faChargingStation} from '@fortawesome/free-solid-svg-icons/faChargingStation';
import {faPhoneVolume} from '@fortawesome/free-solid-svg-icons/faPhoneVolume';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import {faFingerprint} from '@fortawesome/free-solid-svg-icons/faFingerprint';
import {faWifi} from '@fortawesome/free-solid-svg-icons/faWifi';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {faSimCard} from '@fortawesome/free-solid-svg-icons/faSimCard';
import {faPowerOff} from '@fortawesome/free-solid-svg-icons/faPowerOff';
import {faCameraRetro} from '@fortawesome/free-solid-svg-icons/faCameraRetro';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {faPrint} from '@fortawesome/free-solid-svg-icons/faPrint';
import {faImages} from '@fortawesome/free-solid-svg-icons/faImages';
import {faFileInvoice} from '@fortawesome/free-solid-svg-icons/faFileInvoice';
import {faArrowAltCircleRight} from '@fortawesome/free-solid-svg-icons/faArrowAltCircleRight';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {PrintService} from '../service/print.service';
import {ImageSenderService} from '../service/image-sender.service';
import {EmailSenderService} from '../service/email-sender.service';
import {SigPadService} from '../service/sig-pad.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {DeviceInputService} from '../service/device-input.service';
import {PrintEntity} from '../entity/Print_Pojo';
import {Observable, Subscription} from 'rxjs';
import {Client} from '../entity/ClientWeb';
import {map, startWith} from 'rxjs/operators';
import {PreOrderShop} from '../entity/PreOrderShop';
import {PreOrderDto} from '../entity/PreOrderDto';

@Component({
  selector: 'app-add-new-order',
  templateUrl: './add-new-order.component.html',
  styleUrls: ['./add-new-order.component.css']
})
export class AddNewOrderComponent implements OnInit, OnDestroy {
  used = faDesktop;
  mobile = faMobile;
  email = faEnvelope;
  money = faHandHoldingUsd;
  cogs = faCogs;
  address = faHouseDamage;
  date = faCode;
  conditions = faDelicious;
  code = faUserLock;
  usertag = faUserSecret;
  userPerson = faUserCheck;
  userFamely = faUserGraduate;
  ivaCompany = faBars;
  sidCompany = faCode;
  phone = faPhoneSquare;
  barcode = faBarcode;
  money2 = faMoneyCheck;
  password = faUnlockAlt;
  accessory = faPaperclip;
  test = faClipboardList;
  note = faCommentAlt;
  discar = faTrashAlt;
  bluetoothIcon = faBluetooth;
  sensors = faDigitalTachograph;
  display = faMobileAlt;
  conections = faChargingStation;
  soundPhone = faPhoneVolume;
  sound = faVolumeUp;
  faceIdFa = faFlushed;
  touch = faFingerprint;
  wifi = faWifi;
  microfon = faMicrophone;
  sim = faSimCard;
  keybord = faPowerOff;
  cameraFront = faCameraRetro;
  camera = faCamera;
  text = faEnvelopeOpenText;
  save = faDownload;
  printer = faPrint;
  display_touch = faMobile;
  photo = faImages;
  modul = faFileInvoice;
  vibrations = faVihara;
  software = faFileSignature;
  homeButton = faCircle;
  companyType = faArrowAltCircleRight;
  mail = faEnvelope;
  formClient: FormGroup;
  companyShow = false;
  typeSender: string;
  titleForm: string;
  countSigPad = 0;
  showAddButton = false;
  buttonCheckBox = 'Select All';
  showAddAutocomplete = false;
  filteredItems1: Observable<any[]>;
  prompt = 'Click <enter> to add "';
  itemsModels: string[] = [];
  invoice_event: Subscription;
  sig_pad_event: Subscription;
  email_send_event: Subscription;
  email_anime_event: Subscription;
  email_send_disable = true;
  formSubmitted: boolean;
  client: Client;
  preOrderShop: PreOrderShop;
  preOrderDtto: PreOrderDto;
  private subscriber: Subscription;
  private subscription: Subscription;
  private subscriptionPrintSuccess: Subscription;

  constructor(private fb: FormBuilder, private httpService: HttpClien,
              private alert_service: AlertServiceService,
              private print: PrintService,
              private imageSender: ImageSenderService,
              private emailSender: EmailSenderService,
              private sig_pad_service: SigPadService,
              private animation_wait: AnimeServiceService,
              private service_input: DeviceInputService) {
    this.formClient = this.fb.group({
      family: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null),
      telephone_number: new FormControl(null),
      telephone_number_second: new FormControl(null),
      address: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      // deviceType: new FormControl(null, [Validators.required]),
      typeObject: new FormControl(null),
      deposit: new FormControl(null, [Validators.required]),
      color: new FormControl(null, [Validators.required]),
      typeOrder: new FormControl(null, [Validators.required]),
      price: new FormControl(null, [Validators.required]),
      client_type: new FormControl(false),
      note: new FormControl(''),
      email_send: new FormControl(false),
    });

  }

  ngOnInit(): void {
    this.subscription = this.httpService.getListModelsDevice().subscribe(list => {
      this.itemsModels = list;
    });
    this.filteredItems1 = this.formClient.controls.model.valueChanges.pipe(
      startWith(''),
      map(item => item ? this.filterItems(item) : this.itemsModels.slice())
    );
    this.animation_call();
    this.titleForm = 'Create New Order Invoice ';
  }

  createClient() {
    let formData = Object.assign({});
    formData = Object.assign(formData, this.formClient.value);
    this.client = new Client(null, formData.family, formData.name, formData.companyName, formData.email,
      formData.telephone_number, formData.telephone_number_second, formData.address,
      null, formData.email_send, formData.client_type,
      formData.ivaClient, formData.sdiClient, null, null, null,
      null);
    this.preOrderShop = new PreOrderShop(null, null, null, new Date(), null, formData.typeOrder,
      formData.color, formData.model, formData.typeObject, formData.deposit, formData.price, formData.note,
      null, null);
    this.preOrderDtto = new PreOrderDto(this.client, this.preOrderShop);
    return this.preOrderDtto;
  }

  dismissed() {
    if (confirm('Are you sure you want to dismiss')) {
      this.alert_service.warn('', 'Sorry, you ' +
        'left the module.', true, false, '', null);
    }
  }

  animation_call() {
    this.animationButtonForm();
    this.animationCheckBox();
    this.animationTitle();
    this.animationInput();
  }

  animationButtonForm() {
    document.querySelectorAll('.button').forEach(button => {
      button.addEventListener('mouseenter', () => {
        if (this.formClient.valid) {
          button.id = 'success-button';
        } else {
          button.id = 'wrong-button';
        }
      });
    });
  }

  animationCheckBox() {
    document.querySelectorAll('.checkbox').forEach(checkbox => {
      checkbox.addEventListener('click', () => {
        if (!checkbox.value) {
          checkbox.id = 'success-checkbox';
        } else {
          checkbox.id = 'wrong-checkbox';
        }
      });
    });
  }

  animationTitle() {
    document.querySelectorAll('fa-icon').forEach(title => {
      title.addEventListener('mouseenter', () => {
        if (!title.classList.contains('button-icon')) {
          title.id = 'title-hover';
        }
      });
    });
  }

  animationInput() {
    document.querySelectorAll('label').forEach(label => {
      label.addEventListener('input', ev => {
        if (ev.target.validity.valid) {
          const htmlElement = label.querySelector('fa-icon') as HTMLElement;
          if (ev.target.type !== 'checkbox' && !ev.target.classList.contains('text-area')) {
            htmlElement.style.color = '#34495E';
          }
        }
        if (ev.target.value === '' && !ev.target.classList.contains('text-area')) {
          const htmlElement = label.querySelector('fa-icon') as HTMLElement;
          htmlElement.style.color = 'lightcoral';
        }
      });
    });

  }

  sign_pad_open() {
    if (!this.formClient.valid) {
      this.alert_service.warn('', 'Before sending the form ' +
        'to the Email please complete all the fields !!! Thank you. Try again.', false, false, '', null);
      Object.keys(this.formClient.controls).forEach(key => {
        this.formClient.controls[key].markAllAsTouched();
      });
      return;
    }
    if (this.checkNumberLength(this.formClient.controls.telephone_number.value)) {
      return;
    }
    if (this.formClient.controls.email.value === null && this.formClient.controls.email.invalid) {
      this.alert_service.warn('', 'Enter the recipient\'s email', false, false, '', null);
      return;
    }
    if (this.countSigPad === 0) {
      this.countSigPad++;
      this.sig_pad_service.open$.emit();
      this.sig_pad_event = this.sig_pad_service.open$.subscribe(() => {
        this.animation_wait.$anime_show.emit(true);
        this.submitFormAndSendEmail();
      });
    } else {
      this.animation_wait.$anime_show.emit(true);
      this.submitFormAndSendEmail();
    }
  }

  submitFormAndSendEmail() {
    this.emailSender.email_send(new PrintEntity(null,
      5, null,
      null, this.typeSender, this.titleForm, this.createClient()));

  }

  checkNumberLength(number: string): boolean {
    if (this.checkLengthString(number)) {
      number = null;
      this.formClient.controls.telephone_number.setValue(null);
    }
    if (number != null && number?.length < 5) {
      this.alert_service.info(null, 'The entered Telephone Number is not valid. Check the value entered in the Telephone Number and please try again'
        , false, false, '', null);
      return true;
    } else {
      return false;
    }
  }

  checkLengthString(string: string): boolean {
    if (string != null) {
      string.trim();
      if (string.length !== 0) {
        return false;
      }
    }
    return true;
  }

  companyClient() {
    this.companyShow = !this.companyShow;
    if (this.companyShow) {
      this.formClient.addControl('companyName', new FormControl(null));
      this.formClient.addControl('sdiClient', new FormControl(null));
      this.formClient.addControl('ivaClient', new FormControl(null));
      this.formClient.controls.name.setValue(null);
      this.formClient.controls.family.setValue(null);
      this.formClient.removeControl('name');
      this.formClient.removeControl('family');
    } else {
      this.formClient.controls.companyName.setValue(null);
      this.formClient.controls.ivaClient.setValue(null);
      this.formClient.controls.sdiClient.setValue(null);
      this.formClient.removeControl('companyName');
      this.formClient.removeControl('sdiClient');
      this.formClient.removeControl('ivaClient');
      this.formClient.addControl('name', new FormControl(null, [Validators.required]));
      this.formClient.addControl('family', new FormControl(null, [Validators.required]));
    }
  }

  emailControlChange() {
    this.email_send_disable = (this.formClient.controls.email.invalid && this.formClient.controls.email.value.length > 0);
  }

  filterItems(name) {
    let results = this.itemsModels.filter(item =>
      item?.toLowerCase().indexOf(name?.toLowerCase()) === 0);

    this.showAddButton = results.length === 0;
    if (this.showAddButton) {
      results = [this.prompt + name + '"'];
    }
    this.showAddAutocomplete = true;

    return results;
  }

  optionSelected(option) {
    if (option?.indexOf(this.prompt) === 0) {
      this.addOptionModel();
    } else {
      this.formClient.controls.model.setValue(option);
      this.showAddAutocomplete = false;
    }
  }

  addOptionModel() {
    const option = this.removePromptFromOption(this.formClient.controls.model.value);
    if (!this.itemsModels.some(entry => entry === option)) {
      const index = this.itemsModels.push(option) - 1;
      this.formClient.controls.model.setValue(this.itemsModels[index]);
    }
    this.addNewModels(option);
  }

  removePromptFromOption(option) {
    if (option.startsWith(this.prompt)) {
      option = option.substring(this.prompt.length, option.length - 1);
    }
    return option;
  }

  addNewModels(models: string) {
    this.httpService.addNewModelsToList(models).subscribe(() => {
    }, error => {
      console.log(error);
    });
  }

  ngOnDestroy(): void {
    if (this.sig_pad_event) {
      this.sig_pad_event.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
