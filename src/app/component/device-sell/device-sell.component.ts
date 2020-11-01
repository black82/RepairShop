import {Component, OnDestroy, OnInit} from '@angular/core';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faUserLock} from '@fortawesome/free-solid-svg-icons/faUserLock';
import {faUserSecret} from '@fortawesome/free-solid-svg-icons/faUserSecret';
import {faUserCheck} from '@fortawesome/free-solid-svg-icons/faUserCheck';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faCode} from '@fortawesome/free-solid-svg-icons/faCode';
import {faCircle, faFileSignature, faFlushed, faPaperclip, faPhoneSquare, faVihara} from '@fortawesome/free-solid-svg-icons';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
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
import {Client} from '../entity/ClientWeb';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Repair} from '../entity/Repair';
import {RepairFileStorage} from '../entity/RepairFileStorage';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';
import {Observable, Subscription} from 'rxjs';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {PrintService} from '../service/print.service';
import {ImageSenderService} from '../service/image-sender.service';
import {EmailSenderService} from '../service/email-sender.service';
import {SigPadService} from '../service/sig-pad.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {DeviceInputService} from '../service/device-input.service';
import {map, startWith} from 'rxjs/operators';
import {PrintEntity} from '../entity/Print_Pojo';
import {InvoiceType} from '../entity/InvoiceType';
import {DeviceForSale} from '../entity/DeviceForSale';
import {faHouseDamage} from '@fortawesome/free-solid-svg-icons/faHouseDamage';
import {faDelicious} from '@fortawesome/free-brands-svg-icons/faDelicious';
import {faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons/faHandHoldingUsd';
import {faDesktop} from '@fortawesome/free-solid-svg-icons/faDesktop';
import {faUserGraduate} from '@fortawesome/free-solid-svg-icons/faUserGraduate';
import {OutputTest} from '../entity/OutputTest';
import {faPrayingHands} from '@fortawesome/free-solid-svg-icons/faPrayingHands';

@Component({
  selector: 'app-device-sell',
  templateUrl: './device-sell.component.html',
  styleUrls: ['./device-sell.component.css']
})
export class DeviceSellComponent implements OnInit, OnDestroy {

  used = faDesktop;
  mobile = faMobile;
  email = faEnvelope;
  money = faHandHoldingUsd;
  cogs = faCogs;
  address = faHouseDamage;
  date = faCalendarPlus;
  conditions = faDelicious;
  code = faUserLock;
  usertag = faUserSecret;
  userPerson = faUserCheck;
  userFamely = faUserGraduate;
  ivaCompany = faBars;
  sidCompany = faCode;
  phone = faPhoneSquare;
  barcode = faBarcode;
  money2 = faPrayingHands;
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
  homeButton = faCircle;
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
  companyType = faArrowAltCircleRight;
  client: Client;
  client_after_saved: Client;
  formClient: FormGroup;
  device: DeviceForSale;
  repair: Repair;
  outputTest: OutputTest;
  formSubmitted: boolean;
  repairFileStorage: RepairFileStorage = new RepairFileStorage();
  invoice: InvoiceToolsDto;
  mail = faEnvelope;
  showAnimation = false;
  invoice_event: Subscription;
  sig_pad_event: Subscription;
  email_send_event: Subscription;
  email_anime_event: Subscription;
  email_send_disable = true;
  countSigPad = 0;
  typeSender: string;
  titleForm: string;
  showAddButton = false;
  buttonCheckBox = 'Select All';
  showAddAutocomplete = false;
  filteredItems1: Observable<any[]>;
  prompt = 'Click <enter> to add "';
  itemsModels: string[] = [];
  companyShow = false;
  showContainerRedact = false;
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

  }

  ngOnInit() {
    this.service_input.$deviceForSaleClient.subscribe(device => {
      this.device = device;
      this.client = new Client(null, null, null, null, null,
        null, null, null, null, null, null,
        null, null, null, null, device, null);
      this.showContainerRedact = true;
      setTimeout(() => {
        this.animation_call();
      }, 200);
    });
    this.buildForm();
    this.subscription = this.httpService.getListModelsDevice().subscribe(list => {
      this.itemsModels = list;
    });
    this.filteredItems1 = this.formClient.controls.model.valueChanges.pipe(
      startWith(''),
      map(item => item ? this.filterItems(item) : this.itemsModels.slice())
    );
    this.subscriber = this.service_input.$client_push.subscribe(clientPush => {
      this.client = clientPush;
    });
      }

  buildForm(): void {
    this.formClient = this.fb.group({
      family: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.email]),
      telephone_number: new FormControl(null),
      telephone_number_second: new FormControl(null),
      address: new FormControl(null, [Validators.required]),
      model: new FormControl(null),
      deviceWarranty: new FormControl(null, [Validators.required]),
      imei: new FormControl(null),
      code_device: new FormControl(null),
      password_device: new FormControl(null),
      accessory: new FormControl(null, [Validators.required]),
      date_to_sale: new FormControl(null, [Validators.required]),
      deviceType: new FormControl(null),
      price: new FormControl(null, [Validators.required]),
      sensors_input: new FormControl(false),
      display_input: new FormControl(false),
      connectors_input: new FormControl(false),
      sound_equipment_input: new FormControl(false),
      audio_equipment_input: new FormControl(false),
      software: new FormControl(false),
      bluetooth: new FormControl(false),
      vibrations: new FormControl(false),
      touch_input: new FormControl(false),
      display_touch_input: new FormControl(false),
      wi_fi_input: new FormControl(false),
      microphone_input: new FormControl(false),
      sim_input: new FormControl(false),
      keyboard_input: new FormControl(false),
      camera_input: new FormControl(false),
      faceId_input: new FormControl(false),
      camera_input_front: new FormControl(false),
      homeButton: new FormControl(false),
      client_type: new FormControl(false),
      note: new FormControl(''),
      email_send: new FormControl(false),
      condition: new FormControl(null, [Validators.required])
    });

  }

  createClient() {
    this.repairFileStorage.fotoEnterDevice = this.imageSender.submitImageToBack();
    let formData = Object.assign({});
    formData = Object.assign(formData, this.formClient.value);

    this.outputTest = new OutputTest(null, formData.sensors_input, formData.display_input,
      formData.connectors_input, formData.sound_equipment_input, formData.touch_input, formData.display_touch_input,
      formData.wi_fi_input, formData.microphone_input, formData.sim_input,
      formData.keyboard_input, formData.camera_input, formData.camera_input_front,
      formData.bluetooth, formData.vibrations, formData.audio_equipment_input,
      formData.software, formData.faceId_input, formData.homeButton);

    this.device = new DeviceForSale(this.device.idDeviceSale, formData.model, this.device.deviceType, formData.condition,
      formData.imei, formData.code_device, formData.password_device, formData.accessory, formData.deviceClass,
      this.device.noteInput, formData.note, formData.deviceWarranty, this.device.inputTest, this.outputTest, this.repairFileStorage
      , true, this.device.bayingPrice, formData.price, this.device.dateBaying, formData.date_to_sale);

    this.client = new Client(null, formData.family, formData.name, formData.companyName, formData.email,
      formData.telephone_number, formData.telephone_number_second, formData.address,
      null, formData.email_send, formData.client_type,
      formData.ivaClient, formData.sdiClient, null, null,
      new Array<DeviceForSale>(this.device), null);
    return this.client;
  }

  checkImeiLength(imei: string): boolean {
    if (this.checkLengthString(imei)) {
      imei = null;
      this.formClient.controls.imei.setValue(null);
    }
    if (imei != null && imei?.length < 14) {
      this.alert_service.info(null, 'The entered IMEI is not valid. Check the value entered in the IMEI and please try again'
        , false, false, '', null);
      return true;
    } else {
      return false;
    }
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

  dismissed() {
    if (confirm('Are you sure you want to dismiss')) {
      this.alert_service.warn('', 'Sorry, you ' +
        'left the module.', true, false, '', null);
    }
  }

  animation_call() {
    console.log('animation_call');
    this.animationButtonForm();
    this.animationTitle();
    this.animationInput();
    this.animationCheckBox();
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

  clickEmailSender() {
    this.typeSender = InvoiceType.emailInvoice;
    this.titleForm = 'You are in a position to send invoices and preview';
    this.sign_pad_open();
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
    if (this.checkImeiLength(this.formClient.controls.imei.value) ||
      this.checkNumberLength(this.formClient.controls.telephone_number.value)) {
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
    this.emailSender.email_send(new PrintEntity(this.createClient(),
      4, null,
      null, this.typeSender, this.titleForm));

  }

  animation_end() {
    this.email_anime_event = this.emailSender.anime_question.subscribe(value => {
      this.showAnimation = value;
    });
  }

  ngOnDestroy(): void {
    if (this.invoice_event) {
      this.invoice_event.unsubscribe();
    }
    if (this.sig_pad_event) {
      this.sig_pad_event.unsubscribe();
    }
    if (this.email_send_event) {
      this.email_send_event.unsubscribe();
    }
    if (this.email_anime_event) {
      this.email_anime_event.unsubscribe();
    }
    if (this.subscriber) {
      this.subscriber.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionPrintSuccess) {
      this.subscriptionPrintSuccess.unsubscribe();
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
    }, () => {
    });
  }

  getClient() {
    return this.client_after_saved;
  }

  companyClient() {
    this.companyShow = !this.companyShow;
    if (this.companyShow) {
      this.formClient.addControl('companyName', new FormControl(null, [Validators.required]));
      this.formClient.addControl('sdiClient', new FormControl(null, [Validators.required]));
      this.formClient.addControl('ivaClient', new FormControl(null, [Validators.required]));
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

  selectAllCheckBox() {
    this.checkButtonTitle();
    const container = document.getElementById('check-box-container');
    const elementsByClassName = container.querySelectorAll('input[type="checkbox"]');
    Array.from(elementsByClassName).forEach(check => {
      check.click();

    });
  }

  checkButtonTitle() {
    if (this.buttonCheckBox === 'Select All') {
      this.buttonCheckBox = 'Unselect All';
    } else {
      this.buttonCheckBox = 'Select All';
    }
  }

}
