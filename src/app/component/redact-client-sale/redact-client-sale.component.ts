import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {faMicrochip} from '@fortawesome/free-solid-svg-icons/faMicrochip';
import {faHeart} from '@fortawesome/free-solid-svg-icons/faHeart';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faMoneyBill} from '@fortawesome/free-solid-svg-icons/faMoneyBill';
import {
  faCircle,
  faFileSignature,
  faFlushed,
  faHandsHelping,
  faPhoneSquare,
  faUserCircle,
  faUserTag,
  faVihara
} from '@fortawesome/free-solid-svg-icons';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {faAddressCard} from '@fortawesome/free-solid-svg-icons/faAddressCard';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faUserLock} from '@fortawesome/free-solid-svg-icons/faUserLock';
import {faUnlockAlt} from '@fortawesome/free-solid-svg-icons/faUnlockAlt';
import {faHatWizard} from '@fortawesome/free-solid-svg-icons/faHatWizard';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {faMeteor} from '@fortawesome/free-solid-svg-icons/faMeteor';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import {Client} from '../entity/ClientWeb';
import {faHistory} from '@fortawesome/free-solid-svg-icons/faHistory';
import {DeviceForSaleTransaction} from '../entity/DeviceForSaleTransaction';
import {faDelicious} from '@fortawesome/free-brands-svg-icons/faDelicious';
import {faBarcode} from '@fortawesome/free-solid-svg-icons/faBarcode';
import {faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons/faHandHoldingUsd';
import {faUserSecret} from '@fortawesome/free-solid-svg-icons/faUserSecret';
import {Observable, Subscription} from 'rxjs';
import {DeviceInputService} from '../service/device-input.service';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {HttpClien} from '../service/clientservice.service';
import {map, startWith} from 'rxjs/operators';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {faBars} from '@fortawesome/free-solid-svg-icons/faBars';
import {faMoneyCheck} from '@fortawesome/free-solid-svg-icons/faMoneyCheck';
import {faClipboardList} from '@fortawesome/free-solid-svg-icons/faClipboardList';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons/faCommentAlt';
import {faDigitalTachograph} from '@fortawesome/free-solid-svg-icons/faDigitalTachograph';
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
import {faDownload} from '@fortawesome/free-solid-svg-icons/faDownload';
import {faPrint} from '@fortawesome/free-solid-svg-icons/faPrint';
import {faImages} from '@fortawesome/free-solid-svg-icons/faImages';
import {faFileInvoice} from '@fortawesome/free-solid-svg-icons/faFileInvoice';
import {InputTest} from '../entity/InputTest';
import {OutputTest} from '../entity/OutputTest';
import {DeviceForSale} from '../entity/DeviceForSale';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from "../service/anime-service.service";

@Component({
  selector: 'app-redact-client-sale',
  templateUrl: './redact-client-sale.component.html',
  styleUrls: ['./redact-client-sale.component.css']
})
export class RedactClientSaleComponent implements OnInit, OnDestroy {
  @Input()
  typeActionAfter: boolean;
  formClient: UntypedFormGroup;
  chip = faMicrochip;
  used = faHeart;
  mobile = faMobile;
  email = faEnvelope;
  money = faMoneyBill;
  userStaff = faUserCircle;
  cogs = faCogs;
  address = faAddressCard;
  date = faCalendarPlus;
  code = faUserLock;
  usertag = faUserTag;
  phone = faPhoneSquare;
  password = faUnlockAlt;
  accessory = faHatWizard;
  display = faMobileAlt;
  text = faEnvelopeOpenText;
  work = faTools;
  discar = faTrashAlt;
  ivaCompany = faBars;
  money2 = faMoneyCheck;
  test = faClipboardList;
  note = faCommentAlt;
  sensors = faDigitalTachograph;
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
  save = faDownload;
  printer = faPrint;
  display_touch = faMobile;
  photo = faImages;
  modul = faFileInvoice;
  faceIdFa = faFlushed;
  vibrations = faVihara;
  software = faFileSignature;
  test_meteor = faMeteor;
  shows_button = faAngleDoubleRight;
  client: Client;
  showClientRepair = false;
  hide_button = faHistory;
  deviceForSaleDto: DeviceForSaleTransaction;
  deviceForSaleDtoConstruct: DeviceForSaleTransaction;
  showDevice = false;
  conditions = faDelicious;
  guaranty = faHandsHelping;
  barcode = faBarcode;
  sealed = faHandHoldingUsd;
  userAdmin = faUserSecret;
  homeButton = faCircle;
  showAddAutocomplete = false;
  filteredItems1: Observable<any[]>;
  prompt = 'Click <enter> to add "';
  itemsModels: string[] = [];
  showAddButton = false;
  private subscription: Subscription;
  private companyShow: boolean;
  private subscriptionModel: Subscription;
  private output_test: OutputTest;
  private inputTest: InputTest;
  private client2: Client;
  private deviceForSale: DeviceForSale;

  constructor(private deviceInputService: DeviceInputService,
              private fb: UntypedFormBuilder,
              private httpService: HttpClien,
              private alert_service: AlertServiceService, private animeWait: AnimeServiceService) {
  }

  ngOnInit(): void {
    this.subscription = this.deviceInputService.$deviceForSaleClientTransactionRedact.subscribe(transaction => {
      this.deviceForSaleDto = transaction;
      console.log(transaction)
      this.deviceForSaleDtoConstruct = transaction;
      this.subscriptionModel = this.httpService.getListModelsDevice().subscribe(list => {
        this.itemsModels = list;
      });

      this.createFormAfterClientCam();
      this.showDevice = true;
      this.filteredItems1 = this.formClient.controls.model.valueChanges.pipe(
        startWith(''),
        map(item => item ? this.filterItems(item) : this.itemsModels.slice())
      );
    });

  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscriptionModel) {
      this.subscriptionModel.unsubscribe();
    }
  }

  createFormAfterClientCam(): void {
    this.formClient = this.fb.group({
      companyName: new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.companyName, this.deviceForSaleDto?.clientSailing?.typeClient ? [Validators.required] : []),
      family: new UntypedFormControl(this.deviceForSaleDto?.clientBaying?.family, [Validators.required]),
      name: new UntypedFormControl(this.deviceForSaleDto?.clientBaying?.name, [Validators.required]),
      telephone_number_baying: new UntypedFormControl(this.deviceForSaleDto?.clientBaying?.telephone_number),
      telephone_sec_number_baying: new UntypedFormControl(this.deviceForSaleDto?.clientBaying?.telephone_number_second),
      email_baying: new UntypedFormControl(this.deviceForSaleDto?.clientBaying?.email),
      addresses_baying: new UntypedFormControl(this.deviceForSaleDto?.clientBaying?.address, [Validators.required]),
      name_selling: new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.name, [Validators.required]),
      family_selling: new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.family, [Validators.required]),
      iva_selling: new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.ivaCompany, this.deviceForSaleDto?.clientSailing?.typeClient ? [Validators.required] : []),
      sdi_selling: new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.sdiCompany, this.deviceForSaleDto?.clientSailing?.typeClient ? [Validators.required] : []),
      telephone_selling: new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.telephone_number),
      email_selling: new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.email),
      telephone_second_selling: new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.telephone_number_second, [Validators.required]),
      address_selling: new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.address, [Validators.required]),
      deviceType: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.deviceType, [Validators.required]),
      baying_price: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.bayingPrice, [Validators.required]),
      seller_price: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.sellerPrice, [Validators.required]),
      model: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.model, [Validators.required]),
      accessory: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.accessory, [Validators.required]),
      code_device: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.code_device, [Validators.required]),
      state_of_use: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.state_of_use, [Validators.required]),
      condition_flag: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.conditionFlag, [Validators.required]),
      deviceWarranty: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.garantyDuration, [Validators.required]),
      imei: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.imei, [Validators.required]),
      password_device: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.password_device, [Validators.required]),
      note_output: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.noteOutput),
      note_input: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.noteInput),
      sensors_input: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.inputTest.sensors_input),
      display_input: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.inputTest.display_input),
      connectors_input: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.inputTest.connectors_input),
      sound_equipment_input: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.inputTest.sound_equipment_input),
      audio_equipment_input: new UntypedFormControl(this.deviceForSaleDto.deviceForSale.inputTest.audio_equipment),
      software: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.software),
      bluetooth: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.bluetooth),
      vibrations: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.vibrations),
      touch_input: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.touch_input),
      display_touch_input: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.display_touch_input),
      wi_fi_input: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.wi_fi_input),
      microphone_input: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.microphone_input),
      sim_input: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.sim_input),
      keyboard_input: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.keyboard_input),
      camera_input: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.camera_input),
      camera_input_front: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.camera_input_front),
      faceId_input: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.faceIdInput),
      faceId_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.faceIdOutput),
      note: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.noteOutput),
      email_send: new UntypedFormControl(false),
      sensor_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.sensors_Output),
      display_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.display_Output),
      connections_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.connectors_Output),
      sound_equipment_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.sound_equipment_Output),
      touch_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.touch_Output),
      display_touch_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.display_touch_Output),
      wi_fi_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.wi_fi_Output),
      microphone_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.microphone_Output),
      sim_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.sim_Output),
      audio_equipment_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.audio_equipment),
      software_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.software),
      bluetooth_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.bluetooth),
      vibrations_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.vibrations),
      keyboard_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.keyboard_Output),
      camera_output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.camera_Output),
      camera_Output_Front: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.camera_Output_Front),
      homeButton_Output: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.outputTest?.homeButton),
      homeButton: new UntypedFormControl(this.deviceForSaleDto?.deviceForSale?.inputTest?.homeButton),
    });
  }

  createDeviceForSaleTransaction(): DeviceForSaleTransaction {
    let formData = Object.assign({DeviceForSaleTransaction});
    formData = Object.assign(formData, this.formClient.value);
    this.inputTest = new InputTest(this.deviceForSaleDto.deviceForSale.inputTest.id_input, formData.sensors_input, formData.display_input,
      formData.connectors_input, formData.sound_equipment_input, formData.touch_input, formData.display_touch_input,
      formData.wi_fi_input, formData.microphone_input, formData.sim_input,
      formData.keyboard_input, formData.camera_input, formData.camera_input_front,
      formData.bluetooth, formData.vibrations, formData.audio_equipment_input,
      formData.software, formData.faceId_input, formData.homeButton);

    if (this.deviceForSaleDto.deviceForSale.outputTest) {
      this.output_test = new OutputTest(this.deviceForSaleDto.deviceForSale.outputTest.id_Output,
        formData.sensor_output, formData.display_output,
        formData.connections_output, formData.sound_equipment_output, formData.touch_output, formData.display_touch_output,
        formData.wi_fi_output, formData.microphone_output, formData.sim_output,
        formData.keyboard_output, formData.camera_output, formData.camera_Output_Front,
        formData.bluetooth_output, formData.vibrations_output,
        formData.audio_equipment_output, formData.software, formData.faceId_output, formData.homeButton_Output);
    }

    this.client = new Client(this.deviceForSaleDto.clientBaying.id, formData.family, formData.name, formData.companyName,
      formData.email_baying, formData.telephone_number_baying, formData.telephone_sec_number_baying, formData.addresses_baying,
      this.deviceForSaleDto.clientBaying.device, this.deviceForSaleDto.clientBaying.send_email_active,
      this.deviceForSaleDto.clientBaying.typeClient, formData.iva_selling, formData.sdiClient,
      this.deviceForSaleDto.clientBaying.createUser, this.deviceForSaleDto.clientBaying.lastModified,
      this.deviceForSaleDto.clientBaying.deviceSale,
      this.deviceForSaleDto.clientBaying.deviceBay);
    if (this.deviceForSaleDto.clientSailing) {
      this.client2 = new Client(this.deviceForSaleDto.clientSailing.id, formData.family_selling, formData.name_selling,
        formData.companyName, formData.email_selling, formData.telephone_selling,
        formData.telephone_second_selling, formData.address_selling,
        this.deviceForSaleDto.clientSailing.device, this.deviceForSaleDto.clientSailing.send_email_active,
        this.deviceForSaleDto.clientSailing.typeClient, formData.iva_selling, formData.sdi_selling,
        this.deviceForSaleDto.clientSailing.createUser, this.deviceForSaleDto.clientSailing.lastModified,
        this.deviceForSaleDto.clientSailing.deviceSale,
        this.deviceForSaleDto.clientSailing.deviceBay);
    }
    this.deviceForSale = new DeviceForSale(this.deviceForSaleDto.deviceForSale.idDeviceSale, formData.model,
      formData.deviceType, formData.state_of_use, formData.imei, formData.code_device, formData.password_device
      , formData.accessory, formData.condition_flag, formData.note_input, formData.note_output, formData.deviceWarranty
      , this.inputTest, this.output_test, this.deviceForSaleDto.deviceForSale?.repairFileStorage,
      this.deviceForSaleDto.deviceForSale.isSaled
      , formData.baying_price, formData.seller_price, this.deviceForSaleDto?.deviceForSale?.dateBaying,
      this.deviceForSaleDto?.deviceForSale?.dateSale,
      this.deviceForSaleDto?.deviceForSale?.bayingUser, this.deviceForSaleDto.deviceForSale?.sellerUser,
      this.deviceForSaleDto.deviceForSale?.updaterUser);
    this.deviceForSaleDtoConstruct = new DeviceForSaleTransaction(this.deviceForSaleDto.deviceForSaleTransactionId,
      this.client, this.client2, this.deviceForSale);
    return this.deviceForSaleDtoConstruct;
  }


  submitForm() {
    if (!this.formClient.invalid) {
      this.alert_service.warn('',
        ' The field cannot be empty.', false, false, '');
      return;
    }
    this.animeWait.$anime_show.emit(true);
    this.httpService.putDeviceForSaleRedact(this.createDeviceForSaleTransaction()).subscribe((res) => {
      this.deviceForSaleDto = res;
      this.deviceInputService.$deviceForSaleClientTransaction.emit(res);
      this.animeWait.$anime_show.emit(false);
      this.alert_service.success('',
        ' Success Saved !!! ', true, false, '');
    });
  }

  companyClient() {
    this.companyShow = !this.companyShow;
    if (this.companyShow) {
      this.formClient.addControl('companyName', new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.companyName, [Validators.required]));
      this.formClient.addControl('sdiClient', new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.sdiCompany, [Validators.required]));
      this.formClient.addControl('ivaClient', new UntypedFormControl(this.deviceForSaleDto?.clientSailing?.ivaCompany, [Validators.required]));
      this.formClient.controls.name.setValue(null);
      this.formClient.controls.family.setValue(null);
      this.formClient.removeControl('name');
      this.formClient.removeControl('family');
    } else {
      this.formClient.removeControl('companyName');
      this.formClient.removeControl('sdiClient');
      this.formClient.removeControl('ivaClient');
      this.formClient.addControl('name', new UntypedFormControl(null, [Validators.required]));
      this.formClient.addControl('family', new UntypedFormControl(null, [Validators.required]));
    }
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


  dismissed() {
    this.deviceInputService.$deviceForSaleClientTransaction.emit(this.deviceForSaleDto);
    this.alert_service.warn('warn', ' Form Discarded !!!', true, false, "")
  }
}
