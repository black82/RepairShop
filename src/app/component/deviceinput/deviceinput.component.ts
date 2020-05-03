import {Component, OnInit} from '@angular/core';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faPhoneSquare, faUserTag} from '@fortawesome/free-solid-svg-icons';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faUserLock} from '@fortawesome/free-solid-svg-icons/faUserLock';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
import {faMoneyCheck} from '@fortawesome/free-solid-svg-icons/faMoneyCheck';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons/faUnlockAlt';
import {faHatWizard} from '@fortawesome/free-solid-svg-icons/faHatWizard';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons/faClipboardList';
import {faFingerprint} from '@fortawesome/free-solid-svg-icons/faFingerprint';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faNetworkWired} from '@fortawesome/free-solid-svg-icons/faNetworkWired';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import {faDigitalTachograph} from '@fortawesome/free-solid-svg-icons/faDigitalTachograph';
import {faWifi} from '@fortawesome/free-solid-svg-icons/faWifi';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {faSimCard} from '@fortawesome/free-solid-svg-icons/faSimCard';
import {faKeyboard} from '@fortawesome/free-solid-svg-icons/faKeyboard';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {Client} from '../entity/ClientWeb';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Device} from '../entity/Device';
import {Repair} from '../entity/Repair';
import {InputTest} from '../entity/InputTest';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {PrintService} from '../service/print.service';
import {faPrint} from '@fortawesome/free-solid-svg-icons/faPrint';
import {PrintEntity} from '../entity/Print_Pojo';
import {ImageSenderService} from '../service/image-sender.service';
import {RepairFileStorage} from '../entity/RepairFileStorage';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';

@Component({
  selector: 'app-deviceinput',
  templateUrl: './deviceinput.component.html',
  styleUrls: ['./deviceinput.component.css']
})
export class DeviceinputComponent implements OnInit {
  used = faHeart;
  mobile = faMobile;
  email = faEnvelope;
  money = faMoneyBill;
  cogs = faCogs;
  address = faAddressCard;
  date = faCalendarPlus;
  code = faUserLock;
  usertag = faUserTag;
  phone = faPhoneSquare;
  barcode = faBarcode;
  money2 = faMoneyCheck;
  password = faUnlockAlt;
  accessory = faHatWizard;
  test = faClipboardList;
  note = faCommentAlt;
  discar = faTrashAlt;
  sensors = faDigitalTachograph;
  display = faMobileAlt;
  conections = faNetworkWired;
  sound = faVolumeUp;
  touch = faFingerprint;
  wifi = faWifi;
  microfon = faMicrophone;
  sim = faSimCard;
  keybord = faKeyboard;
  camera = faCamera;
  text = faEnvelopeOpenText;
  save = faDownload;
  printer = faPrint;
  client: Client;
  client_after_saved: Client;
  formClient: FormGroup;
  device: Device;
  repair: Repair;
  inputTest: InputTest;
  formSubmitted: boolean;
  repairFileStorage: RepairFileStorage = new RepairFileStorage();
  invoice: InvoiceToolsDto;

  constructor(private fb: FormBuilder, private httpService: HttpClien,
              private alert_service: AlertServiceService, private print: PrintService, private imageSender: ImageSenderService) {
    this.formClient = this.fb.group({
      family: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      telephone_number: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      model: new FormControl('', [Validators.required]),
      state_of_use: new FormControl('', [Validators.required]),
      imei: new FormControl('', [Validators.required]),
      code_device: new FormControl('', [Validators.required]),
      password_device: new FormControl('', [Validators.required]),
      accessory: new FormControl('', [Validators.required]),
      date_to_enter: new FormControl('', [Validators.required]),
      defect: new FormControl('', [Validators.required]),
      deposit: new FormControl('', [Validators.required]),
      price: new FormControl('', [Validators.required]),
      sensors_input: new FormControl(false),
      display_input: new FormControl(false),
      connectors_input: new FormControl(false),
      sound_equipment_input: new FormControl(false),
      touch_input: new FormControl(false),
      wi_fi_input: new FormControl(false),
      microphone_input: new FormControl(false),
      sim_input: new FormControl(false),
      keyboard_input: new FormControl(false),
      camera_input: new FormControl(false),
      note: new FormControl(''),
      email_send: new FormControl(false, [Validators.required]),
      date_exit: new FormControl('', [Validators.required])
    });
  }

  ngOnInit() {
    this.animation_call();
    this.print.invoice_make.subscribe(invoice => {
      this.create_invoice(invoice);
    });
  }


  createClient() {
    this.repairFileStorage.fotoEnterDevice = this.imageSender.submitImageToBack();
    let formData = Object.assign({});
    formData = Object.assign(formData, this.formClient.value);
    this.inputTest = new InputTest(null, formData.sensors_input, formData.display_input,
      formData.connectors_input, formData.sound_equipment_input, formData.touch_input,
      formData.wi_fi_input, formData.microphone_input, formData.sim_input,
      formData.keyboard_input, formData.camera_input);
    this.repair = new Repair(null, formData.date_to_enter, null, formData.defect,
      formData.deposit, formData.price, null, null, true,
      this.inputTest, null, formData.note, this.repairFileStorage);
    this.device = new Device(null, formData.model, formData.state_of_use,
      formData.imei, formData.code_device, formData.password_device, formData.accessory, true, [this.repair]);
    this.client = new Client(null, formData.family, formData.name, formData.email,
      formData.telephone_number, formData.address, [this.device], formData.email_send);
    return this.client;
  }

  submitForm() {
    if (!this.formClient.valid) {
      Object.keys(this.formClient.controls).forEach(key => {
        this.formClient.controls[key].markAllAsTouched();
      });
      this.alert_service.warn('', 'You form not valid',
        false, false, '');
      return;
    }
    if (!this.client_after_saved) {
      this.alert_service.info(null, 'The first to save is necessary to print or send invoices by email.'
        , false, null, '', null);
    } else {
      this.httpService.saved_print_page(this.invoice).subscribe(url => {
        this.alert_service.success(null, 'The client' + this.client.name +
          'received a device and closed the repair procedure !!! Client Id ' + this.client_after_saved.id, true, null, '');
        return;
      }, error => {
        this.alert_service.error(null, 'The client' + this.client.name +
          'received a device and not closed the repair procedure !!! Client Id '
          + this.client.id + '\n' + error.message, false, null, '', error);
      });

    }
  }

  print_click() {
    if (!this.formClient.valid) {
      this.alert_service.warn('', 'Before sending the form ' +
        'to the printer please complete all the fields !!! Thank you. Try again.', false, false, '', null);
      Object.keys(this.formClient.controls).forEach(key => {
        this.formClient.controls[key].markAllAsTouched();
      });
      return;
    }
    if (!this.client_after_saved) {
      this.createClient();
    } else {
      this.client = this.client_after_saved;
    }
    this.httpService.printClient(this.client).subscribe(client => {
      this.client_after_saved = client;
      this.print.print_open.emit(new PrintEntity(client, 1, this.formClient.controls.date_exit.value));
    }, error => {
      this.alert_service.error(null, 'The client' + this.client.name +
        'received a device and not closed the repair procedure !!! Client Id '
        + this.client.id + '\n' + error.message, false, null, '', error);
    });
  }

  dismisset() {
    this.alert_service.warn('', 'Sorry, you ' +
      'left the module.', true, false, '', null);
  }

  animation_call() {
    this.animationButtonForm();
    this.animationCheckBox();
    this.animationTitle();
    this.animationInput();
  }

  animationButtonForm() {
    document.querySelectorAll('.button').forEach(button => {
      button.addEventListener('mouseenter', evt => {
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
      checkbox.addEventListener('click', evt => {
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
      title.addEventListener('mouseenter', evt => {
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
          const htmlElement = label.querySelector('fa-icon') as HTMLOrSVGImageElement;
          if (ev.target.type !== 'checkbox') {
            htmlElement.style.color = '#34495E';
          }
        }
        if (ev.target.value === '') {
          const htmlElement = label.querySelector('fa-icon') as HTMLOrSVGImageElement;
          htmlElement.style.color = 'lightcoral';
        }
      });
    });

  }

  private create_invoice(invoice: InvoiceToolsDto) {
    this.invoice = invoice;
  }
}


