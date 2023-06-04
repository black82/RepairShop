import {Component, OnInit} from '@angular/core';
import {faEnvelopeOpenText} from "@fortawesome/free-solid-svg-icons/faEnvelopeOpenText";
import {faBarcode} from "@fortawesome/free-solid-svg-icons/faBarcode";
import {faClipboardList} from "@fortawesome/free-solid-svg-icons/faClipboardList";
import {faCode} from "@fortawesome/free-solid-svg-icons/faCode";
import {faFingerprint} from "@fortawesome/free-solid-svg-icons/faFingerprint";
import {faDesktop} from "@fortawesome/free-solid-svg-icons/faDesktop";
import {
  faCircle,
  faFileSignature,
  faFlushed,
  faPaperclip,
  faPhoneSquare,
  faVihara
} from "@fortawesome/free-solid-svg-icons";
import {faImages} from "@fortawesome/free-solid-svg-icons/faImages";
import {faDigitalTachograph} from "@fortawesome/free-solid-svg-icons/faDigitalTachograph";
import {faChargingStation} from "@fortawesome/free-solid-svg-icons/faChargingStation";
import {faUserGraduate} from "@fortawesome/free-solid-svg-icons/faUserGraduate";
import {faMobile} from "@fortawesome/free-solid-svg-icons/faMobile";
import {faWifi} from "@fortawesome/free-solid-svg-icons/faWifi";
import {faArrowAltCircleRight} from "@fortawesome/free-solid-svg-icons/faArrowAltCircleRight";
import {faVolumeUp} from "@fortawesome/free-solid-svg-icons/faVolumeUp";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons/faTrashAlt";
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {faFileInvoice} from "@fortawesome/free-solid-svg-icons/faFileInvoice";
import {faHandHoldingUsd} from "@fortawesome/free-solid-svg-icons/faHandHoldingUsd";
import {faUnlockAlt} from "@fortawesome/free-solid-svg-icons/faUnlockAlt";
import {faBluetooth} from "@fortawesome/free-brands-svg-icons/faBluetooth";
import {faPhoneVolume} from "@fortawesome/free-solid-svg-icons/faPhoneVolume";
import {faCameraRetro} from "@fortawesome/free-solid-svg-icons/faCameraRetro";
import {faUserSecret} from "@fortawesome/free-solid-svg-icons/faUserSecret";
import {faEnvelope} from "@fortawesome/free-solid-svg-icons/faEnvelope";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons/faPowerOff";
import {faCalendarPlus} from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import {faCamera} from "@fortawesome/free-solid-svg-icons/faCamera";
import {faMicrophone} from "@fortawesome/free-solid-svg-icons/faMicrophone";
import {faMobileAlt} from "@fortawesome/free-solid-svg-icons/faMobileAlt";
import {faUserLock} from "@fortawesome/free-solid-svg-icons/faUserLock";
import {faHouseDamage} from "@fortawesome/free-solid-svg-icons/faHouseDamage";
import {faDelicious} from "@fortawesome/free-brands-svg-icons/faDelicious";
import {faUserCheck} from "@fortawesome/free-solid-svg-icons/faUserCheck";
import {faSimCard} from "@fortawesome/free-solid-svg-icons/faSimCard";
import {faPrayingHands} from "@fortawesome/free-solid-svg-icons/faPrayingHands";
import {faCogs} from "@fortawesome/free-solid-svg-icons/faCogs";
import {faCommentAlt} from "@fortawesome/free-solid-svg-icons/faCommentAlt";
import {faDownload} from "@fortawesome/free-solid-svg-icons/faDownload";
import {faPrint} from "@fortawesome/free-solid-svg-icons/faPrint";
import {Client} from "../entity/ClientWeb";
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from "@angular/forms";
import {DeviceForSale} from "../entity/DeviceForSale";
import {Repair} from "../entity/Repair";
import {OutputTest} from "../entity/OutputTest";
import {RepairFileStorage} from "../entity/RepairFileStorage";
import {InvoiceToolsDto} from "../entity/InvoiceToolsDto";
import {Observable, Subscription} from "rxjs";
import {HttpClien} from "../service/clientservice.service";
import {AlertServiceService} from "../service/alert-service.service";
import {PrintService} from "../service/print.service";
import {ImageSenderService} from "../service/image-sender.service";
import {EmailSenderService} from "../service/email-sender.service";
import {SigPadService} from "../service/sig-pad.service";
import {AnimeServiceService} from "../service/anime-service.service";
import {DeviceForSaleTransaction} from "../entity/DeviceForSaleTransaction";
import {SparePartsReturnDto} from "../entity/SparePartsReturnDto";
import {faMound} from "@fortawesome/free-solid-svg-icons/faMound";
import {faBug} from "@fortawesome/free-solid-svg-icons/faBug";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons/faUserAstronaut";
import {faLaptopMedical} from "@fortawesome/free-solid-svg-icons/faLaptopMedical";
import {faPalette} from "@fortawesome/free-solid-svg-icons/faPalette";

@Component({
  selector: 'app-save-return-spare',
  templateUrl: './save-return-spare.component.html',
  styleUrls: ['./save-return-spare.component.css']
})
export class SaveReturnSpareComponent implements OnInit {


  used = faDesktop;
  mobile = faLaptopMedical;
  colorIcon=faPalette;
  reason = faMound;
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
  defect = faBug;
  supplier=faUserAstronaut;
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

  formClient: UntypedFormGroup;
  formSubmitted: boolean;

  mail = faEnvelope;
  spareReturn: SparePartsReturnDto;
  printPage = false;

  constructor(private fb: UntypedFormBuilder, private httpService: HttpClien,
              private alert_service: AlertServiceService,
              private print: PrintService,
              private imageSender: ImageSenderService,
              private emailSender: EmailSenderService,
              private sig_pad_service: SigPadService,
              private animation_wait: AnimeServiceService) {
  }

  ngOnInit(): void {
    this.buildForm();
  }

  buildForm(): void {
    this.formClient = this.fb.group({
      client: new UntypedFormControl('', [Validators.required]),
      reason: new UntypedFormControl(null, [Validators.required]),
      difect: new UntypedFormControl(null, [Validators.required]),
      supplier: new UntypedFormControl(null, [Validators.required]),
      color: new UntypedFormControl(null, [Validators.required]),
      model: new UntypedFormControl(null, [Validators.required]),
      note: new UntypedFormControl(null, [Validators.required]),
    });

  }

  dismissed() {
    if (confirm("Are you sure you want to go out?")){
      this.alert_service.warn('', 'Go Home !!!', true, false, '', null);
    }

  }

  creatReturn() {
    if (!this.formClient.valid) {
      this.alert_service.warn('', 'Before sending the form ' +
        'saved please complete all the fields !!! Thank you. Try again.', false, false, '', null);
      Object.keys(this.formClient.controls).forEach(key => {
        this.formClient.controls[key].markAllAsTouched();
      });
      return;
    }


   this.animation_wait.$anime_show.emit(true);
    const images = this.imageSender.submitImageToBack().map(p => p.fotoBase64);
    this.spareReturn = this.buildReturn(images);
    this.httpService.saveSpare(this.spareReturn).subscribe(spare => {
      this.animation_wait.$anime_show.emit(false);
      this.spareReturn=spare
      this.print.$success_print_to_send.subscribe(p => {
        this.alert_service.success('', 'Return saved Success!!!', true, false, '');
      });

      this.printPage = true;

      this.imageSender.removeImagesAll();
    })

  }

  buildReturn(images: string[]) {
    let formData = Object.assign({DeviceForSaleTransaction});
    formData = Object.assign(formData, this.formClient.value);
    return new SparePartsReturnDto(null, formData.model, formData.color,
      formData.client, formData.reason, formData.difect, formData.supplier,
      null, null, null, null,
      null, null, null, images, formData.note,
      null)
  }

  dismissButton() {
    this.printPage = !this.printPage;
  }
}
