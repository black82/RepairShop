import {Component, Input, OnInit} from '@angular/core';
import {faShare} from '@fortawesome/free-solid-svg-icons';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';
import {Router} from '@angular/router';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {InvoiceType} from '../entity/InvoiceType';

@Component({
  selector: 'app-email-notification',
  templateUrl: './email-notification.component.html',
  styleUrls: ['./email-notification.component.css']
})
export class EmailNotificationComponent implements OnInit {

  save = faShare;
  emailSendForm: FormGroup;
  invoice: InvoiceToolsDto = new InvoiceToolsDto();
  isAdmin = false;
  @Input()
  editable: boolean;
  @Input()
  destinationUser: string;
  @Input()
  typeEmail: string;
  @Input()
  id_repair: number;


  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private httpClient: HttpClien,
              private alertService: AlertServiceService,
              private animation_wait: AnimeServiceService) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.emailSendForm = this.formBuilder.group({

      email: [this.destinationUser, [Validators.required, Validators.email]],

      subject: ['', [Validators.required,
        this.IsErrorState, this.ValidatorTrimSpace]],
      message: ['', [Validators.required, this.IsErrorState]]
    });
  }

  submitForm() {
    if (this.emailSendForm.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    this.checkTypeEmailSend();
  }

  createInvoiceToSend(): InvoiceToolsDto {
    let formData = Object.assign({});
    formData = Object.assign(formData, this.emailSendForm.value);
    this.invoice.destinationUser = formData.email;
    this.invoice.subjectEmail = formData.subject;
    this.invoice.messageEmail = formData.message;
    this.invoice.typeSender = InvoiceType.emailNot;
    this.invoice.repairID = this.id_repair;
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

  checkTypeEmailSend() {
    switch (this.typeEmail) {
      case InvoiceType.emailNot: {
        this.animation_wait.$anime_show.emit(true);
        this.httpClient.sendEmailNotification(this.createInvoiceToSend()).subscribe(() => {
          this.animation_wait.$anime_show.emit(false);
          this.alertService.success('', 'The email was successfully sent to the recipient', true, false, '');
        }, () => {
          this.animation_wait.$anime_show.emit(false);
        });
        break;
      }
    }
  }
}
