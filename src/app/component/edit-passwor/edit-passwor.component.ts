import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {AlertServiceService} from '../service/alert-service.service';
import {HttpClien} from '../service/clientservice.service';
import {PasswordRecoveryPojo} from '../entity/PasswordRecoveryPojo';

@Component({
  selector: 'app-edit-passwor',
  templateUrl: './edit-passwor.component.html',
  styleUrls: ['./edit-passwor.component.css']
})
export class EditPassworComponent implements OnInit {
  loginForm: UntypedFormGroup;
  s: string;
  n: string;

  constructor(private formBuilder: UntypedFormBuilder,
              private alertService: AlertServiceService,
              private httpClient: HttpClien,
              private route: ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params.s) {
        this.s = params.s;
      }
      if (params.n) {
        this.n = params.n;
      }
    });


  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group(
      {
        password: [null,
          [
            Validators.required
          ]],
        confirm_password:
          [null, [
            Validators.required
          ]]
      })
    ;
  }

  onFormSubmit() {
    if (this.loginForm.invalid) {
      this.alertService.info(null, 'Value entered is not valid',
        false, false, '', null);
      return;
    } else {
      const recoveryRequest = this.createRecoverPojo();
      this.httpClient.sendRequestChangePasswordToSaved(recoveryRequest).subscribe(() => {
        this.welcomeAnime();
        const timeout = setTimeout(() => {
          this.alertService.info(null, 'Password changed successfully',
            true, true, 'client/sign-in', null);
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

  private createRecoverPojo(): PasswordRecoveryPojo {
    const value = this.loginForm.controls.password.value;
    return new PasswordRecoveryPojo(null, this.n, this.s, value);
  }
}
