import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClien} from '../service/clientservice.service';
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
          const element = document.querySelector('.close') as HTMLElement;
          localStorage.setItem('token', res.token);
          const nav_url = localStorage.getItem('navigate');
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
      }, (err) => {
        this.alertService.error('', 'You credential is invalid s',
          false, false, '', err);
      });
  }

  createSigInEntity(): ClientLogIn {
    return new ClientLogIn(this.loginForm.controls.email.value, this.loginForm.controls.password.value);
  }

}

