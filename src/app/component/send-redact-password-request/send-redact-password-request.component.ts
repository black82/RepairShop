import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {AlertServiceService} from '../service/alert-service.service';
import {PasswordRecoveryPojo} from '../entity/PasswordRecoveryPojo';
import {HttpClien} from '../service/clientservice.service';

@Component({
  selector: 'app-send-redact-password-request',
  templateUrl: './send-redact-password-request.component.html',
  styleUrls: ['./send-redact-password-request.component.css']
})
export class SendRedactPasswordRequestComponent implements OnInit {
  loginForm: UntypedFormGroup;

  constructor(private formBuilder: UntypedFormBuilder,
              private alertService: AlertServiceService,
              private httpClient: HttpClien) {
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        email: [null,
          [
            Validators.required,
            Validators.email, this.IsErrorState, this.ValidatorTrimSpace
          ]]
      });
  }

  onFormSubmit() {
    if (this.loginForm.invalid) {
      this.alertService.info(null, 'Value entered is not an email',
        false, false, '', null);
      return;
    } else {
      const recoveryRequest = new PasswordRecoveryPojo(this.loginForm.controls.email.value,
        null, null, null);
      this.httpClient.sendRequestChangePassword(recoveryRequest).subscribe(() => {
        this.welcomeAnime();
        const timeout = setTimeout(() => {
          this.alertService.info(null, 'Before logging in, control the email',
            true, true, '', null);
          clearTimeout(timeout);
        }, 3500);
      });
    }
  }

  welcomeAnime() {
    const loginForm = document.getElementById('login-text');
    const elementById = document.getElementById('welcome-anime');
    const htmlFormElement = document.querySelector('form') as HTMLElement;
    if (elementById && htmlFormElement) {
      loginForm.classList.add('login-text-anime');
      htmlFormElement.classList.add('form-anime');
      elementById.classList.add('welcome-anime-1');
    }
  }

  IsErrorState(control: UntypedFormControl | null, form: FormGroupDirective | NgForm | null) {
    const isSubmitted = form && form.submitted;
    if (!!(control && control.invalid && (control.dirty || control.touched || isSubmitted))) {
      return {validity: true};
    } else {
      return null;
    }
  }

  ValidatorTrimSpace(control: UntypedFormControl) {
    const value = control?.value as string;
    if (value?.trim() === '') {
      this.loginForm.controls.email.value.trim();
      return {validSpace: true};
    }
    if (value?.startsWith(' ')) {
      this.loginForm.controls.email.value.trim();
      return {validSpace: true};
    }
    if (value?.endsWith(' ')) {
      this.loginForm.controls.email.value.trim();
      return {validSpace: true};
    }
    return null;
  }
}
