import {Component, OnInit} from '@angular/core';
import {faBomb} from "@fortawesome/free-solid-svg-icons/faBomb";
import {faQuestion} from "@fortawesome/free-solid-svg-icons/faQuestion";
import {faUserTag} from "@fortawesome/free-solid-svg-icons";
import {faHistory} from "@fortawesome/free-solid-svg-icons/faHistory";
import {faColonSign} from "@fortawesome/free-solid-svg-icons/faColonSign";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons/faUserAstronaut";
import {faCalendar} from "@fortawesome/free-solid-svg-icons/faCalendar";
import {faCalendarCheck} from "@fortawesome/free-solid-svg-icons/faCalendarCheck";
import {faCalendarPlus} from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import {faMobile} from "@fortawesome/free-solid-svg-icons/faMobile";
import {faCog} from "@fortawesome/free-solid-svg-icons/faCog";
import {faEdge} from "@fortawesome/free-brands-svg-icons/faEdge";
import {SparePartsReturnDto} from "../entity/SparePartsReturnDto";
import {HttpClien} from "../service/clientservice.service";
import {FormBuilder, FormGroup, UntypedFormBuilder, UntypedFormControl, Validators} from "@angular/forms";
import {ImageSenderService} from "../service/image-sender.service";
import {AlertServiceService} from "../service/alert-service.service";

@Component({
  selector: 'app-spare-redact-component',
  templateUrl: './spare-redact-component.component.html',
  styleUrls: ['./spare-redact-component.component.css'],
})
export class SpareRedactComponentComponent implements OnInit {
  editTransaction = false;
  hide_button = faCog;
  showDevice = false;
  code = faEdge;
  spareReturn: SparePartsReturnDto
  usertag = faUserTag;
  difect = faBomb;
  statuse = faHistory;
  model = faMobile;
  reason = faQuestion;
  color = faColonSign;
  userRec = faUserTag;
  date = faCalendar;
  dateControl = faCalendarPlus;
  dateSent = faCalendarCheck;
  supplier = faUserAstronaut;
  images: string [];
  formClient: FormGroup;

  constructor(private httpClient: HttpClien,
              private fb: UntypedFormBuilder,
              private imageSender: ImageSenderService,
              private alertService: AlertServiceService) {

  }

  ngOnInit(): void {
    this.httpClient.getSpareById(2).subscribe(p => {
      this.spareReturn = p;
      this.images=this.spareReturn.filesSpareReturn
      this.createFormAfterClientCam();
      this.showDevice = true;
    })
  }

  submitForm() {
    if (!this.formClient.valid) {
      this.alertService.warn('', 'Before sending the form ' +
        'to the Email please complete all the fields !!! Thank you. Try again.', false, false, '', null);
      Object.keys(this.formClient.controls).forEach(key => {
        this.formClient.controls[key].markAllAsTouched();
      });
      return;
    }
    const images = this.imageSender.submitImageToBack().map(p => p.fotoBase64);
    console.log(images);
    if (images?.length > 0) {
     this.spareReturn.filesSpareReturn= this.spareReturn.filesSpareReturn.concat(images);
    }
   const dto= this.createSpare();
    this.httpClient.updateSpare(dto).subscribe(() => {
      this.alertService.success('', 'Return successfully updated', true, false, '');
    });


  }

  createFormAfterClientCam(): void {
    this.formClient = this.fb.group({
      client: new UntypedFormControl(this.spareReturn.client, [Validators.nullValidator, Validators.required, Validators.maxLength(255)]),
      model: new UntypedFormControl(this.spareReturn.model, [Validators.nullValidator, Validators.required, Validators.maxLength(255)]),
      difect: new UntypedFormControl(this.spareReturn.difect, [Validators.nullValidator, Validators.required, Validators.maxLength(255)]),
      reason: new UntypedFormControl(this.spareReturn.reason, [Validators.nullValidator, Validators.required, Validators.maxLength(255)]),
      color: new UntypedFormControl(this.spareReturn.color, [Validators.nullValidator, Validators.required, Validators.maxLength(255)]),
      supplier: new UntypedFormControl(this.spareReturn.supplier, [Validators.nullValidator, Validators.required, Validators.maxLength(255)])
    })
  }

  private createSpare() {
    let formData = Object.assign({});
    formData = Object.assign(formData, this.formClient.value);
    return new SparePartsReturnDto(this.spareReturn.id,
      formData.model, formData.color, formData.client,
      formData.reason, formData.difect, formData.supplier,
      this.spareReturn.technicReceived, this.spareReturn.dateReceived,
      this.spareReturn.technicControl, this.spareReturn.dateControl,
      this.spareReturn.dateSend, this.spareReturn.technicSend,
      this.spareReturn.status, this.spareReturn.filesSpareReturn);
  }
}
