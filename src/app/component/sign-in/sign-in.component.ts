import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
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
  loginForm: FormGroup;
  question = faQuestion;
  password = faLock;
  exclamation = faExclamation;
  email = faAt;
  lock = faLock;

  constructor(private formBuilder: FormBuilder,
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
    this.animation_wait.$anime_show.emit(true);
    this.authService.login(client)
      .subscribe(res => {
        this.animation_wait.$anime_show.emit(false);
        if (res.token) {
          if (res.roles) {
            localStorage.setItem('roles', res.roles);
            this.admin.$admin_show.emit(true);
          }
          const element = document.querySelector('.close') as HTMLElement;
          localStorage.setItem('token', res.token);
          if (element) {
            element.click();
          }
          if (nav_url) {
            this.router.navigate([nav_url]);
            localStorage.removeItem('navigate');

          } else {
            this.router.navigate(['']).then(r => r);
          }
        }
        this.autoLogout.startListenerActivity();
      }, (err) => {
        this.animation_wait.$anime_show.emit(false);
        console.log(err);
      });
  }

  createSigInEntity(): ClientLogIn {
    return new ClientLogIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
  }

  IsErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null) {
    const isSubmitted = form && form.submitted;
    if (!!(control && control.invalid && (control.dirty || control.touched || isSubmitted))) {
      return {validity: true};
    } else {
      return null;
    }
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

  deleteTacked() {
    this.authService.logout();
  }
}

