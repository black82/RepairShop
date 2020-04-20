import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClien} from '../service/clientservice.service';
import {ErrorStateMatcher} from '@angular/material/core';
import {AlertServiceService} from '../service/alert-service.service';
import {ClientLogIn} from '../entity/ClientLogIn';
import {faLock} from '@fortawesome/free-solid-svg-icons/faLock';
import {faQuestion} from '@fortawesome/free-solid-svg-icons/faQuestion';
import {faExclamation} from '@fortawesome/free-solid-svg-icons';

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

  constructor(private formBuilder: FormBuilder,
              private router: Router, private authService: HttpClien, private alertService: AlertServiceService) {
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group(
      {
        email: [null,
          [
            Validators.required,
            Validators.email
          ]],
        password: [null,
          Validators.required,
        ]
      });
    this.loginForm.get('email').setValue(' ');
  }

  onFormSubmit() {
    if (this.loginForm.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    const client = this.createSigInEntity();
    this.authService.login(client)
      .subscribe(res => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          this.router.navigate(['']).then(r => r);
        }
      }, (err) => {
        this.alertService.error('', 'You credential is invalid s',
          false, false, '', err);
      });
  }

  createSigInEntity(): ClientLogIn {
    return new ClientLogIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
  }

}

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher
  implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control
      && control.invalid
      && (control.dirty
        || control.touched ||
        isSubmitted));
  }
}