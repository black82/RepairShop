import {Component, OnInit} from '@angular/core';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons';
import {faUserTag} from '@fortawesome/free-solid-svg-icons/faUserTag';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faMicrochip} from '@fortawesome/free-solid-svg-icons/faMicrochip';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import {faMapMarkedAlt} from '@fortawesome/free-solid-svg-icons/faMapMarkedAlt';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faMoneyCheck} from '@fortawesome/free-solid-svg-icons/faMoneyCheck';
import {faHatWizard} from '@fortawesome/free-solid-svg-icons/faHatWizard';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons/faClipboardList';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faDigitalTachograph} from '@fortawesome/free-solid-svg-icons/faDigitalTachograph';
import {faNetworkWired} from '@fortawesome/free-solid-svg-icons/faNetworkWired';
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import {faFingerprint} from '@fortawesome/free-solid-svg-icons/faFingerprint';
import {faWifi} from '@fortawesome/free-solid-svg-icons/faWifi';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {faSimCard} from '@fortawesome/free-solid-svg-icons/faSimCard';
import {faKeyboard} from '@fortawesome/free-solid-svg-icons/faKeyboard';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Client} from '../entity/ClientWeb';
import {HttpClien} from '../service/clientservice.service';

import {Repair} from '../entity/Repair';
import {OutputTest} from '../entity/OutputTest';
import {AlertServiceService} from '../service/alert-service.service';
import {PrintService} from '../service/print.service';
import {faPrint} from '@fortawesome/free-solid-svg-icons/faPrint';
import {PrintEntity} from '../entity/Print_Pojo';
import {FiltreMoreDeviceRepairActivService} from '../service/filtre-more-device-repair-activ.service';
import {FormhidenService} from '../service/formhiden.service';
import {ImageSenderService} from '../service/image-sender.service';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';
import {EmailSenderService} from '../service/email-sender.service';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {SigPadService} from '../service/sig-pad.service';


@Component({
  selector: 'app-otpout-device',
  templateUrl: './otpout-device.component.html',
  styleUrls: ['./otpout-device.component.css']
})
export class OtpoutDeviceComponent implements OnInit {
  date = faCalendarCheck;
  usertag = faUserTag;
  mobile = faMobile;
  barcode = faBarcode;
  cogs = faCogs;
  chip = faMicrochip;
  work = faTools;
  money = faMoneyBill;
  address = faMapMarkedAlt;
  model = faMobileAlt;
  depossit = faMoneyCheck;
  accessory = faHatWizard;
  test = faClipboardList;
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
  return_device_button_text = 'Search Device';
  formClient: FormGroup;
  titleForm = 'Search Return Device by  Repair Number';
  client: Client;
  output_test: OutputTest;
  repair_output: Repair;
  show_client = false;
  formSubmitted = false;
  client_after_saved: Client;
  invoice: InvoiceToolsDto;
  mail = faEnvelope;

  constructor(private fb: FormBuilder,
              private httpService: HttpClien,
              private alert_service: AlertServiceService,
              private printService: PrintService,
              private  check_device: FiltreMoreDeviceRepairActivService,
              private hidden_form: FormhidenService,
              private imageSender: ImageSenderService,
              private emailSender: EmailSenderService,
              private sig_pad_service: SigPadService) {
  }

  ngOnInit() {
    this.hidden_form.form_open.subscribe(value => {
      this.show_client = value;
    });
    this.printService.invoice_make.subscribe(invoice => {
      this.create_invoice(invoice);
    });
    setInterval(() => {
      if (this.show_client) {
        this.animation_call();
        clearInterval();
      }
    }, 300);

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
        this.alert_service.success(null, 'The client' + this.client_after_saved.name +
          'received a device and create the repair procedure !!! Client Id '
          + this.client_after_saved.id + 'Document url : \n' + url, true, null, '');
        return;
      }, error => {
        this.alert_service.error(null, 'The client' + this.client.name +
          'received a device and not closed the repair procedure !!! Client Id '
          + this.client.id + '\n' + error.message, false, null, '', error);
      });

    }
  }

  createFormAfterClientCam() {
    this.formClient = this.fb.group({
      return_date: [null, [Validators.required]],
      name_family_output: [this.client.family, [Validators.required]],
      mobile_output: [this.client.device[0].model, [Validators.required]],
      imei_output: [this.client.device[0].imei, [Validators.required]],
      defect_output: [this.client.device[0].repairs[0].defect, [Validators.required]],
      parts_replace_output: [this.client.device[0].repairs[0].parts_replaced, [Validators.required]],
      work_don_output: [this.client.device[0].repairs[0].work_don, [Validators.required]],
      price_output: [this.client.device[0].repairs[0].price, [Validators.required]],
      address_output: [this.client.address, [Validators.required]],
      model_output: [this.client.device[0].model, [Validators.required]],
      deposit_output: [this.client.device[0].repairs[0].deposit, [Validators.required]],
      accessory_output: [this.client.device[0].accessory, [Validators.required]],
      sensor_output: [false, [Validators.required]],
      display_output: [false, [Validators.required]],
      connections_output: [false, [Validators.required]],
      sound_equipment_output: [false, [Validators.required]],
      touch_output: [false, [Validators.required]],
      wi_fi_output: [false, [Validators.required]],
      microphone_output: [false, [Validators.required]],
      sim_output: [false, [Validators.required]],
      keyboard_output: [false, [Validators.required]],
      camera_output: [false, [Validators.required]],
      note_output: [this.client.device[0].repairs[0].note],
    });
  }

  client_catch(client1) {
    if (client1 as Client) {
      this.client = client1;
      this.show_client = true;
      this.hidden_form.form_open.emit(true);
      this.createFormAfterClientCam();
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

    this.client = this.addRepairToClient(this.client);

    this.httpService.printClient(this.client).subscribe(client => {
      this.client_after_saved = client;
      this.printService.print_open.emit(new PrintEntity(client, 2));
    }, error => {
      this.alert_service.error(null, 'The client' + this.client.name +
        'received a device and not closed the repair procedure !!! Client Id '
        + this.client.id + '\n' + error.message, false, null, '', error);
    });
  }

  createClient(): Repair {
    this.client.device[0].repairs[0].repairFileStorage.fotoExitDevice = this.imageSender.submitImageToBack();
    let formData = Object.assign({});
    formData = Object.assign(formData, this.formClient.value);
    this.output_test = new OutputTest(null, formData.sensor_output, formData.display_output,
      formData.connections_output, formData.sound_equipment_output, formData.touch_output,
      formData.wi_fi_output, formData.microphone_output, formData.sim_output,
      formData.keyboard_output, formData.camera_output);
    this.repair_output = new Repair(this.client.device[0].repairs[0].id_Repair,
      this.client.device[0].repairs[0].date_to_enter, this.formClient.controls.return_date.value,
      this.formClient.controls.defect_output.value,
      this.formClient.controls.deposit_output.value,
      this.formClient.controls.price_output.value,
      this.formClient.controls.work_don_output.value,
      this.formClient.controls.parts_replace_output.value, this.client.device[0].repairs[0].nowInRepair,
      this.client.device[0].repairs[0].inputModule, this.output_test, this.formClient.controls.note_output.value,
      this.client.device[0].repairs[0].repairFileStorage);
    this.repair_output.date_to_enter = this.client.device[0].repairs[0].date_to_enter;
    return this.repair_output;
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
    this.sig_pad_service.open$.emit();
    this.sig_pad_service.open$.subscribe(() => {
      this.submitFormAndSendEmail();
    });
  }

  dismissed() {
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
        if (!checkbox?.value) {
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
      const icon = label.querySelector('fa-icon') as HTMLElement;
      const inputElement = label.querySelector('input');
      if (inputElement?.value?.length !== 0 && inputElement?.style) {
        if (icon?.style?.color) {
          icon.style.color = '#34495E';
        }
      }
      label.addEventListener('input', ev => {
        if (ev.target?.validity?.valid && icon?.style) {
          icon.style.color = '#34495E';
        }
      });
    });

  }

  submitFormAndSendEmail() {
    this.client = this.addRepairToClient(this.client);
    this.subscribe_success_response();
    this.httpService.printClient(this.client).subscribe(client => {
      this.client_after_saved = client;
      this.emailSender.email_send(new PrintEntity(client, 2));
    }, error => {
      this.alert_service.error(null, 'The client2' + this.client.name +
        'received a device and not closed the repair procedure !!! Client Id '
        + this.client.id + '\n' + error.message, false, null, '', error);
    });
  }

  subscribe_success_response() {
    this.emailSender.email_sent_send_success.subscribe(() => {
      this.alert_service.success(null, 'The client' + this.client_after_saved.name +
        'received a device and create the repair procedure !!! Client Id '
        + this.client_after_saved.id, true, null, '');
      return;
    });
  }

  addRepairToClient(client: Client): Client {
    if (client.device.length === 1) {
      if (client.device[0].repairs.length === 1) {
        client.device[0].repairs[0] = this.createClient();
      } else {
        const repairs = client.device[0].repairs.map(repair => {
          if (repair.nowInRepair) {
            repair = this.createClient();
          }
          return repair;
        });
        client.device[0].repairs = repairs;
      }
    }
    return client;
  }

  private create_invoice(invoice: InvoiceToolsDto) {
    this.invoice = invoice;
  }
}
