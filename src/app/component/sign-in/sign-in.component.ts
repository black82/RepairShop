import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {ClientLogIn} from '../entity/ClientLogIn';
import {faLock} from '@fortawesome/free-solid-svg-icons/faLock';
import {faQuestion} from '@fortawesome/free-solid-svg-icons/faQuestion';
import {faAt, faExclamation} from '@fortawesome/free-solid-svg-icons';
import {AdminServiceService} from '../service/admin-service.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {AutoLogoutService} from '../service/auto-logout-service.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {
  loginForm: UntypedFormGroup;
  question = faQuestion;
  password = faLock;
  exclamation = faExclamation;
  email = faAt;
  lock = faLock;
  fullName: string;

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private authService: HttpClien,
              private alertService: AlertServiceService,
              private admin: AdminServiceService,
              private animation_wait: AnimeServiceService,
              private autoLogout: AutoLogoutService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: [null,
          [
            Validators.required,
            Validators.email, this.IsErrorState, this.ValidatorTrimSpace
          ]],
        password: [null,
          [Validators.required, this.IsErrorState, Validators.minLength(4),
            Validators.maxLength(10), this.ValidatorTrimSpace
          ]]
      });
  }

  onFormSubmit() {
    if (this.loginForm.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    const nav_url = localStorage.getItem('navigate');
    this.deleteTacked();
    const client = this.createSigInEntity();
    this.authService.login(client)
      .subscribe(res => {
        if (res.fullname) {
          this.fullName = res.fullname;
        } else {
          this.fullName = '';
        }
        this.welcomeAnime();
        const timeout = setTimeout(() => {
          if (res.token) {
            if (res.roles) {
              localStorage.setItem('roles', res.roles);
              localStorage.setItem('token', res.token);
              this.admin.$admin_show.emit(true);
              this.admin.$user_show.emit(true);
            } else {
              localStorage.setItem('token', res.token);
              this.admin.$user_show.emit(true);
            }
            if (res.position) {
              localStorage.setItem('position', res.position);
              this.admin.$user_position.emit(res.position);
            } else {
              localStorage.setItem('position', 'position undefined');
              this.admin.$user_position.emit('position undefined');
            }

            const element = document.querySelector('.close') as HTMLElement;
            if (element) {
              element.click();
            }
            if (nav_url) {
              this.router.navigate([nav_url]).then(r => r);
              localStorage.removeItem('navigate');
            } else {
              this.router.navigate(['']).then(r => r);
            }
          }
          this.autoLogout.startListenerActivity();
          clearTimeout(timeout);
        }, 2500);

      }, () => {
        this.animation_wait.$anime_show.emit(false);
      });
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

  createSigInEntity(): ClientLogIn {
    return new ClientLogIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
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

  deleteTacked() {
    localStorage.clear();
  }
}

