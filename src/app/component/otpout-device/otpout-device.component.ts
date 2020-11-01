import {Component, OnDestroy, OnInit} from '@angular/core';
import {faCalendarCheck, faCircle, faFileSignature, faFlushed, faVihara} from '@fortawesome/free-solid-svg-icons';
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
import {faVolumeUp} from '@fortawesome/free-solid-svg-icons/faVolumeUp';
import {faFingerprint} from '@fortawesome/free-solid-svg-icons/faFingerprint';
import {faWifi} from '@fortawesome/free-solid-svg-icons/faWifi';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons/faMicrophone';
import {faSimCard} from '@fortawesome/free-solid-svg-icons/faSimCard';
import {faKeyboard} from '@fortawesome/free-solid-svg-icons/faKeyboard';
import {faCamera} from '@fortawesome/free-solid-svg-icons/faCamera';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
import {AnimeServiceService} from '../service/anime-service.service';
import {Observable, Subscription} from 'rxjs';
import {faFileInvoice} from '@fortawesome/free-solid-svg-icons/faFileInvoice';
import {faImages} from '@fortawesome/free-solid-svg-icons/faImages';
import {map, startWith} from 'rxjs/operators';
import {faChargingStation} from '@fortawesome/free-solid-svg-icons/faChargingStation';
import {faPhoneVolume} from '@fortawesome/free-solid-svg-icons/faPhoneVolume';
import {faBluetooth} from '@fortawesome/free-brands-svg-icons/faBluetooth';
import {DeviceInputService} from '../service/device-input.service';


@Component({
  selector: 'app-otpout-device',
  templateUrl: './otpout-device.component.html',
  styleUrls: ['./otpout-device.component.css']
})
export class OtpoutDeviceComponent implements OnInit, OnDestroy {

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
  conections = faChargingStation;
  soundPhone = faPhoneVolume;
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
  vibrations = faVihara;
  faceIdFa = faFlushed;
  software = faFileSignature;
  return_device_button_text = 'Search Device';
  formClient: FormGroup;
  titleForm = 'Search Return Device by  Repair Number';
  client: Client;
  output_test: OutputTest;
  repair_output: Repair;
  show_client = false;
  formSubmitted = false;
  invoice: InvoiceToolsDto;
  mail = faEnvelope;
  display_touch = faMobile;
  photo = faImages;
  bluetoothIcon = faBluetooth;
  typeSender: string;
  modul = faFileInvoice;
  id_repair: number;
  private email_event: Subscription;
  private sig_pad_event: Subscription;
  private invoice_mak_event: Subscription;
  private form_open: Subscription;
  private id_repair_event: Subscription;
  email_send_disable = false;
  showAddButton = false;
  showAddAutocomplete = false;
  filteredItems1: Observable<any[]>;
  prompt = 'Click <enter> to add "';
  itemsModels: string[] = [];
  private subscriber: Subscription;
  private sigpad_open_second = false;
  buttonCheckBox = 'select all';
  homeButton = faCircle;
  show_redacting = false;
  private redactClientEvent: Subscription;

  constructor(private fb: FormBuilder,
              private httpService: HttpClien,
              private alert_service: AlertServiceService,
              private printService: PrintService,
              private  check_device: FiltreMoreDeviceRepairActivService,
              private hidden_form: FormhidenService,
              private imageSender: ImageSenderService,
              private emailSender: EmailSenderService,
              private sig_pad_service: SigPadService,
              private animation_wait: AnimeServiceService,
              private device_service: DeviceInputService) {
  }

  ngOnInit(): void {
    this.subscriber = this.httpService.getListPartsDevice().subscribe(list => {
      this.itemsModels = list;
    });

    this.id_repair_event = this.hidden_form.id_repair.subscribe(id => {
      this.id_repair = id;
    });
    this.form_open = this.hidden_form.form_open.subscribe(value => {
      this.show_client = value;
    });
    this.redactClientEvent = this.device_service.$clientAfterRedact.subscribe(client => {
      this.client = client;
    });
  }

  createFormAfterClientCam(): void {
    this.formClient = this.fb.group({
      return_date: [null, [Validators.required]],
      name_family_output: [null, [Validators.required]],
      mobile_output: [null, [Validators.required]],
      imei_output: [null, [Validators.required]],
      defect_output: [null, [Validators.required]],
      parts_replace_output: [null, [Validators.required]],
      work_don_output: [null, [Validators.required]],
      price_output: [null, [Validators.required]],
      address_output: [null, [Validators.required]],
      model_output: [null, [Validators.required]],
      deposit_output: [null, [Validators.required]],
      accessory_output: [null, [Validators.required]],
      sensor_output: new FormControl(false),
      display_output: new FormControl(false),
      connections_output: new FormControl(false),
      sound_equipment_output: new FormControl(false),
      touch_output: new FormControl(false),
      display_touch_output: new FormControl(false),
      wi_fi_output: new FormControl(false),
      microphone_output: new FormControl(false),
      sim_output: new FormControl(false),
      audio_equipment_output: new FormControl(false),
      software: new FormControl(false),
      bluetooth: new FormControl(false),
      vibrations: new FormControl(false),
      keyboard_output: new FormControl(false),
      camera_output: new FormControl(false),
      faceId_output: new FormControl(false),
      camera_Output_Front: new FormControl(false),
      homeButton: new FormControl(false),
      note_output: [''],
    });

  }

  client_catch(client1): void {
    if (client1 as Client) {
      this.client = client1;
      this.show_client = true;
      this.hidden_form.form_open.emit(true);
      this.filterRepair();
      this.createFormAfterClientCam();
      this.emailSendButton();
      this.animation_call();
    }
    this.filteredItems1 = this.formClient?.controls.parts_replace_output?.valueChanges.pipe(
      startWith(''),
      map(item => item ? this.filterItems(item) : this.itemsModels.slice())
    );
  }

  emailSendButton() {
    this.email_send_disable = this.client.email == null;
  }


  createClient(): Repair {
    this.client.device[0].repairs[0].repairFileStorage.fotoExitDevice = this.imageSender.submitImageToBack();
    let formData = Object.assign({});
    formData = Object.assign(formData, this.formClient.value);
    this.output_test = new OutputTest(null, formData.sensor_output, formData.display_output,
      formData.connections_output, formData.sound_equipment_output, formData.touch_output, formData.display_touch_output,
      formData.wi_fi_output, formData.microphone_output, formData.sim_output,
      formData.keyboard_output, formData.camera_output, formData.camera_Output_Front,
      formData.bluetooth, formData.vibrations,
      formData.audio_equipment_output, formData.software, formData.faceId_output, formData.homeButton);
    this.repair_output = new Repair(this.client.device[0].repairs[0].repair_Id,
      this.client.device[0].repairs[0].date_to_enter,
      this.client.device[0].repairs[0].exp_complet_date,
      this.setDataHourAndMin(this.formClient.controls.return_date.value),
      this.formClient.controls.defect_output.value,
      this.formClient.controls.deposit_output.value,
      this.formClient.controls.price_output.value,
      this.formClient.controls.work_don_output.value,
      this.formClient.controls.parts_replace_output.value, this.client.device[0].repairs[0].nowInRepair,
      this.client.device[0].repairs[0].inputModule, this.output_test, this.client.device[0].repairs[0].note,
      this.formClient.controls.note_output.value,
      this.client.device[0].repairs[0].repairFileStorage,
      this.client.device[0].repairs[0]?.lastModifiedRepair, this.client.device[0].repairs[0]?.createUserRepair,
      this.client.device[0].repairs[0]?.closeUserRepair);
    this.repair_output.date_to_enter = this.client.device[0].repairs[0].date_to_enter;
    return this.repair_output;
  }


  sign_pad_open(): void {
    if (!this.formClient.valid) {
      this.alert_service.warn('', 'Before sending the form ' +
        'to the Email please complete all the fields !!! Thank you. Try again.', false, false, '', null);
      Object.keys(this.formClient.controls).forEach(key => {
        this.formClient.controls[key].markAllAsTouched();
      });
      return;
    }
    if (!this.sigpad_open_second) {
      this.sig_pad_service.open$.emit();
      this.sig_pad_event = this.sig_pad_service.open$.subscribe(() => {
        this.animation_wait.$anime_show.emit(true);
        this.submitFormAndSendEmail();
        this.sigpad_open_second = true;
      });
    } else {
      this.animation_wait.$anime_show.emit(true);
      this.submitFormAndSendEmail();
    }
  }

  dismissed(): void {
    if (confirm('Are you sure you want to dismiss')) {
      this.alert_service.warn('', 'Sorry, you ' +
        'left the module.', true, false, '', null);
    }
  }

  animation_call(): void {
    this.animationButtonForm();
    this.animationCheckBox();
    this.animationTitle();
    this.animationInput();
  }

  animationButtonForm(): void {
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

  animationCheckBox(): void {
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

  animationTitle(): void {
    document.querySelectorAll('fa-icon').forEach(title => {
      title.addEventListener('mouseenter', () => {
        if (!title.classList.contains('button-icon')) {
          title.id = 'title-hover';
        }
      });
    });
  }

  animationInput(): void {
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

  submitFormAndSendEmail(): void {
    if (!this.formClient.valid) {
      this.alert_service.warn('', 'Before sending the form ' +
        'to the printer please complete all the fields !!! Thank you. Try again.', false, false, '', null);
      Object.keys(this.formClient.controls).forEach(key => {
        this.formClient.controls[key].markAllAsTouched();
      });
      return;
    }
    this.animation_wait.$anime_show.emit(true);
    this.subscribe_success_response();
    this.client.device[0].repairs[0] = this.createClient();
    this.emailSender.email_send(
      new PrintEntity(this.client, 2, null,
        this.repair_output.repair_Id, this.typeSender, this.titleForm));

  }

  subscribe_success_response(): void {
    this.email_event = this.emailSender.email_sent_send_success.subscribe(value => {
      if (value) {
        this.printService.$success_print_id.emit(value);
      } else {
        this.sigpad_open_second = true;
        this.alert_service.warn(null, 'Edit repair and resend',
          false, false, null);
      }
    });
  }

  addRepairToClient(client: Client): Client {
    if (client.device.length === 1) {
      if (client.device[0].repairs.length === 1) {
        client.device[0].repairs[0] = this.createClient();
      } else {
        client.device[0].repairs = client.device[0].repairs.map(repair => {
          if (repair.nowInRepair) {
            repair = this.createClient();
          }
          return repair;
        });
      }
    }
    return client;
  }

  ngOnDestroy(): void {
    if (this.email_event) {
      this.email_event.unsubscribe();
    }
    if (this.sig_pad_event) {
      this.sig_pad_event.unsubscribe();
    }
    if (this.invoice_mak_event) {
      this.invoice_mak_event.unsubscribe();
    }
    if (this.form_open) {
      this.form_open.unsubscribe();
    }
    if (this.id_repair_event) {
      this.id_repair_event.unsubscribe();
    }
    if (this.redactClientEvent) {
      this.redactClientEvent.unsubscribe();
    }
  }

  setDataHourAndMin(date: Date): Date {
    let dateReturn = null;
    if (date) {
      dateReturn = new Date(date);
      const data = new Date();
      dateReturn.setHours(data.getHours());
      dateReturn.setMinutes(data.getMinutes());
      dateReturn.setSeconds(data.getSeconds());
    }
    return dateReturn;
  }

  private filterRepair(): void {
    const device = this.client.device;
    device.forEach(value => {
        value.repairs.forEach(repair => {
          if (!repair.repair_Id.toString().includes(this.id_repair.toString())) {
            value.repairs.splice(value.repairs.lastIndexOf(repair), 1);
          }
        });
        if (value.repairs.length === 0) {
          device.splice(device.indexOf(value, 1));
        }
      }
    );
    this.client.device = device;
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
      this.formClient.controls.parts_replace_output.setValue(option);
      this.showAddAutocomplete = false;
    }
  }

  addOptionModel() {
    const option = this.removePromptFromOption(this.formClient.controls.parts_replace_output.value);
    if (!this.itemsModels.some(entry => entry === option)) {
      const index = this.itemsModels.push(option) - 1;
      this.formClient.controls.parts_replace_output.setValue(this.itemsModels[index]);
    }
    this.addNewModels(option);
  }

  removePromptFromOption(option) {
    if (option.startsWith(this.prompt)) {
      option = option.substring(this.prompt.length, option.length - 1);
    }
    return option;
  }

  addNewModels(parts: string) {
    this.httpService.addNewPartsToList(parts).subscribe(() => {
    }, error => {
      console.log(error);
    });
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
    if (this.buttonCheckBox === 'select all') {
      this.buttonCheckBox = 'unselect all';
    } else {
      this.buttonCheckBox = 'select all';
    }
  }

  redactRepair() {
    this.show_redacting = true;
    setTimeout(() => {
      this.device_service.$clientRepairIdByRedact.emit(this.id_repair);
      this.device_service.$clientRedactEvent.emit(this.client);
      this.eventClickSavedClient();
    }, 300);

  }

  eventClickSavedClient() {
    let clickRedact = document.getElementById('redact-click');
    if (clickRedact) {
      clickRedact.addEventListener('click', () => {
        this.dismissButton();
      });
    } else {
      setTimeout(() => {
        clickRedact = document.getElementById('redact-click');
        if (clickRedact) {
          clickRedact.addEventListener('click', () => {
            this.dismissButton();
          });
        }
      }, 1000);
    }
  }

  dismissButton() {
    this.show_redacting = false;
  }
}
