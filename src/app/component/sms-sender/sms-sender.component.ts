import {Component, Input, OnInit} from '@angular/core';
import {faShare} from '@fortawesome/free-solid-svg-icons';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {InvoiceType} from '../entity/InvoiceType';

@Component({
  selector: 'app-sms-sender',
  templateUrl: './sms-sender.component.html',
  styleUrls: ['./sms-sender.component.css']
})
export class SmsSenderComponent implements OnInit {
  save = faShare;
  smsSendForm: UntypedFormGroup;
  invoice: InvoiceToolsDto = new InvoiceToolsDto();
  @Input()
  editable: boolean;
  @Input()
  destinationNumber: string;

  constructor(private formBuilder: UntypedFormBuilder,
              private httpClient: HttpClien,
              private alertService: AlertServiceService,
              private animation_wait: AnimeServiceService) {
  }

  ngOnInit(): void {
    this.smsSendForm = this.formBuilder.group({

      phoneNumber: [this.destinationNumber, [Validators.required,
        this.IsErrorState]],

      subject: [null, [Validators.required,
        this.IsErrorState, this.ValidatorTrimSpace]],
      message: [null, [Validators.required, this.IsErrorState]]
    });
  }

  submitForm() {
    if (this.smsSendForm.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    this.animation_wait.$anime_show.emit(true);
    this.httpClient.sendSmsNotification(this.createInvoiceToSend()).subscribe(() => {
      this.animation_wait.$anime_show.emit(false);
      this.soundSend();
      this.alertService.info(null, 'SMS was sent successfully',
        true, true, '', null);
    });
  }

  createInvoiceToSend(): InvoiceToolsDto {
    let formData = Object.assign({});
    formData = Object.assign(formData, this.smsSendForm.value);
    this.invoice.destinationUser = formData.phoneNumber;
    this.invoice.subjectEmail = formData.subject;
    this.invoice.messageEmail = formData.message;
    this.invoice.typeSender = InvoiceType.sms;
    this.invoice.typeFile = InvoiceType.sms;
    return this.invoice;
  }

  ValidatorTrimSpace(control: UntypedFormControl) {
    const value = control?.value as string;
    if (value?.trim() === '') {
      return {validSpace: true};
    }
    if (value?.startsWith(' ')) {
      return {validSpace: true};
    }
    if (value?.endsWith(' ')) {
      return {validSpace: true};
    }
    return null;
  }

  IsErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }

  soundSend() {
    this.alertService.soundSend();
  }
}
