import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {Observable, Subscription} from 'rxjs';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {PrintService} from '../service/print.service';
import {FiltreMoreDeviceRepairActivService} from '../service/filtre-more-device-repair-activ.service';
import {FormhidenService} from '../service/formhiden.service';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faUserLock} from '@fortawesome/free-solid-svg-icons/faUserLock';
import {faFileSignature, faFlushed, faPhoneSquare, faUserTag, faVihara} from '@fortawesome/free-solid-svg-icons';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
import {faMoneyCheck} from '@fortawesome/free-solid-svg-icons/faMoneyCheck';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons/faUnlockAlt';
import {faHatWizard} from '@fortawesome/free-solid-svg-icons/faHatWizard';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons/faClipboardList';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons/faCommentAlt';
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
import {Device} from '../entity/Device';
import {Repair} from '../entity/Repair';
import {InputTest} from '../entity/InputTest';
import {RepairFileStorage} from '../entity/RepairFileStorage';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';
import {faMicrochip} from '@fortawesome/free-solid-svg-icons/faMicrochip';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {ImageSenderService} from '../service/image-sender.service';
import {OutputTest} from '../entity/OutputTest';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faCode} from '@fortawesome/free-solid-svg-icons/faCode';

@Component({
  selector: 'app-edit-repair',
  templateUrl: './edit-repair.component.html',
  styleUrls: ['./edit-repair.component.css']
})
export class EditRepairComponent implements OnInit, OnDestroy {

  client: Client;
  show_client: boolean;
  id_repair: number;
  formClient: FormGroup;
  titleForm = 'Find the repair for editing based on Id';
  discar = faTrashAlt;
  used = faHeart;
  mobile = faMobile;
  email = faEnvelope;
  money = faMoneyBill;
  cogs = faCogs;
  address = faAddressCard;
  date = faCalendarPlus;
  code = faUserLock;
  usertag = faUserTag;
  ivaCompany = faBars;
  sidCompany = faCode;
  phone = faPhoneSquare;
  barcode = faBarcode;
  money2 = faMoneyCheck;
  password = faUnlockAlt;
  accessory = faHatWizard;
  test = faClipboardList;
  note = faCommentAlt;
  sensors = faDigitalTachograph;
  display = faMobileAlt;
  conections = faChargingStation;
  soundPhone = faPhoneVolume;
  sound = faVolumeUp;
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
  faceIdFa = faFlushed;
  vibrations = faVihara;
  software = faFileSignature;
  client_after_saved: Client;
  device: Device;
  chip = faMicrochip;
  work = faTools;
  repair: Repair;
  inputTest: InputTest;
  formSubmitted: boolean;
  repairFileStorage: RepairFileStorage = new RepairFileStorage();
  invoice: InvoiceToolsDto;
  mail = faEnvelope;
  invoice_event: Subscription;
  email_send_event: Subscription;
  email_anime_event: Subscription;
  email_send_disable = true;
  countSigPad = 0;
  showAddAutocomplete = false;
  filteredItems1: Observable<any[]>;
  prompt = 'Press <enter> to add "';
  itemsModels: string[] = [];
  companyShow = false;
  formTitle = 'Find By Id';
  private form_open: Subscription;
  private id_repair_event: Subscription;
  private output_test: OutputTest;

  constructor(private fb: FormBuilder,
              private httpService: HttpClien,
              private alert_service: AlertServiceService,
              private printService: PrintService,
              private  check_device: FiltreMoreDeviceRepairActivService,
              private hidden_form: FormhidenService,
              private imageSender: ImageSenderService) {
  }

  ngOnInit(): void {
    this.id_repair_event = this.hidden_form.id_repair.subscribe(id => {
      this.id_repair = id;
    });
    this.form_open = this.hidden_form.form_open.subscribe(value => {
      this.show_client = value;
      const interval = setInterval(() => {
        if (this.show_client) {
          this.animation_call();
          clearInterval(interval);
        }
      }, 300);
    });

  }

  client_catch(client1): void {
    if (client1 as Client) {
      this.client = client1 as Client;
      this.hidden_form.form_open.emit(true);
      this.filterRepair();
      this.createFormAfterClientCam();
      this.companyShow = !this.client.typeClient;
      this.companyClient();
      this.show_client = true;
    }
  }

  createFormAfterClientCam(): void {
    this.formClient = this.fb.group({
      family: new FormControl(null, [Validators.required]),
      name: new FormControl(null, [Validators.required]),
      email: new FormControl(null),
      telephone_number: new FormControl(null),
      address: new FormControl(null, [Validators.required]),
      model: new FormControl(null, [Validators.required]),
      state_of_use: new FormControl(null, [Validators.required]),
      imei: new FormControl(null),
      code_device: new FormControl(null, [Validators.required]),
      password_device: new FormControl(null, [Validators.required]),
      accessory: new FormControl(null, [Validators.required]),
      date_to_enter: new FormControl(null, [Validators.required]),
      work_don_output: new FormControl(null, [Validators.required]),
      parts_replace_output: new FormControl(null, [Validators.required]),
      defect: new FormControl(null, [Validators.required]),
      deposit: new FormControl(null, [Validators.required]),
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
      camera_input_front: new FormControl(false),
      faceId_input: new FormControl(false),
      faceId_output: new FormControl(false),
      note: new FormControl(''),
      email_send: new FormControl(false),
      date_exit: new FormControl(null, [Validators.required]),
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
      software_output: new FormControl(false),
      bluetooth_output: new FormControl(false),
      vibrations_output: new FormControl(false),
      keyboard_output: new FormControl(false),
      camera_output: new FormControl(false),
      camera_Output_Front: new FormControl(false),
    });
    if (this.client.device[0].rightNowInRepair) {
      this.formClient.removeControl('parts_replace_output');
      this.formClient.removeControl('work_don_output');
      this.formClient.removeControl('date_exit');
    }
  }

  createClient() {
    this.repairFileStorage.fotoEnterDevice = this.imageSender.submitImageToBack();
    let formData = Object.assign({Client});
    formData = Object.assign(formData, this.formClient.value);
    this.inputTest = new InputTest(this.client.device[0].repairs[0].inputModule.id_input, formData.sensors_input, formData.display_input,
      formData.connectors_input, formData.sound_equipment_input, formData.touch_input, formData.display_touch_input,
      formData.wi_fi_input, formData.microphone_input, formData.sim_input,
      formData.keyboard_input, formData.camera_input, formData.camera_input_front,
      formData.bluetooth, formData.vibrations, formData.audio_equipment_input,
      formData.software, formData.faceId_input);
    if (this.client.device[0].repairs[0].outputTest != null) {
      this.output_test = new OutputTest(this.client.device[0].repairs[0].outputTest.id_Output,
        formData.sensor_output, formData.display_output,
        formData.connections_output, formData.sound_equipment_output, formData.touch_output, formData.display_touch_output,
        formData.wi_fi_output, formData.microphone_output, formData.sim_output,
        formData.keyboard_output, formData.camera_output, formData.camera_Output_Front,
        formData.bluetooth_output, formData.vibrations_output,
        formData.audio_equipment_output, formData.software, formData.faceId_output);
    } else {
      this.output_test = null;
    }
    this.addRepairPhoto();
    this.repair = new Repair(this.client.device[0].repairs[0].repair_Id, this.setDataHourAndMin(formData.date_to_enter),
      this.client.device[0].repairs[0].exp_complet_date, this.setDataHourAndMin(formData.date_exit), formData.defect,
      formData.deposit, formData.price, formData.work_don_output,
      formData.parts_replace_output, this.client.device[0].repairs[0].nowInRepair,
      this.inputTest, this.output_test, formData.note, this.client.device[0].repairs[0].noteOutput,
      this.client.device[0].repairs[0].repairFileStorage);
    this.device = new Device(this.client.device[0].id_Device, formData.model, formData.state_of_use,
      formData.imei, formData.code_device, formData.password_device, formData.accessory,
      this.client.device[0].rightNowInRepair, [this.repair]);
    this.client = new Client(this.client.id, formData.family, formData.name, formData.companyName,
      formData.email, formData.telephone_number, this.client.telephone_number_second, formData.address,
      [this.device], formData.email_send, this.client.typeClient, formData.ivaClient, formData.sdiClient);
    return this.client;
  }

  addRepairPhoto() {
    if (this.repairFileStorage.fotoEnterDevice.length > 0) {
      this.client.device[0].repairs[0].repairFileStorage.fotoEnterDevice.concat(this.repairFileStorage.fotoEnterDevice);
    }
  }

  dismissed() {
    this.alert_service.warn('', 'Sorry, you ' +
      'left the module.', true, false, '', null);
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

    this.httpService.savedEditClient(this.createClient()).subscribe(() => {
      this.alert_service.success(null, 'The client ' + this.getNameByTypeClient(this.client) + '  was successfully edited'
        , true, false, '');
    }, error => {
      console.log(error);
    });
  }

  getNameByTypeClient(client: Client): string {
    if (client.typeClient) {
      return client.companyName.toUpperCase();
    } else {
      return client.name.toUpperCase() + ' ' + client.family.toUpperCase();
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

  ngOnDestroy(): void {
    if (this.form_open) {
      this.form_open.unsubscribe();
    }
    if (this.id_repair_event) {
      this.id_repair_event.unsubscribe();
    }
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
}
