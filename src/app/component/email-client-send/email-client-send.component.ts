import {Component, OnInit} from '@angular/core';
import {faShare} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';

@Component({
  selector: 'app-email-client-send',
  templateUrl: './email-client-send.component.html',
  styleUrls: ['./email-client-send.component.css']
})
export class EmailClientSendComponent implements OnInit {
  save = faShare;
  emailSendForm: FormGroup;
  invoice: InvoiceToolsDto = new InvoiceToolsDto();
  formSubmitted: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private httpClient: HttpClien,
              private alertService: AlertServiceService,
              private animation_wait: AnimeServiceService) {
  }

  ngOnInit(): void {
    this.emailSendForm = this.formBuilder.group({

      email: [null, [Validators.required, Validators.email,
        this.IsErrorState]],

      subject: [null, [Validators.required,
        this.IsErrorState, this.ValidatorTrimSpace]],
      message: [null, [Validators.required, this.IsErrorState]]
    });
  }

  submitForm() {
    if (this.emailSendForm.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    this.animation_wait.$anime_show.emit(true);
    this.httpClient.sendSimpleEmailClient(this.createInvoiceToSend()).subscribe(() => {
      this.animation_wait.$anime_show.emit(false);
      this.alertService.success(null, 'The email was successfully sent to the recipient', false, false, '');
    }, error => {
      this.animation_wait.$anime_show.emit(false);
      console.error(error.message);
    });
  }

  createInvoiceToSend(): InvoiceToolsDto {
    let formData = Object.assign({});
    formData = Object.assign(formData, this.emailSendForm.value);
    this.invoice.destinationUser = formData.email;
    this.invoice.subjectEmail = formData.subject;
    this.invoice.messageEmail = formData.message;
    return this.invoice;
  }

  ValidatorTrimSpace(control: FormControl) {
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

  IsErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}
