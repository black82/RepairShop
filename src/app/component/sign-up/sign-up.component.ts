import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from '../service/anime-service.service';


@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  registerForm: UntypedFormGroup;
  messagePassword = '*required field';

  constructor(private formBuilder: UntypedFormBuilder,
              private router: Router,
              private authService: HttpClien,
              private alertService: AlertServiceService,
              private animation_wait: AnimeServiceService) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        fullName: [null, [Validators.required,
          Validators.minLength(2), Validators.maxLength(30),
          this.IsErrorState, this.ValidatorTrimSpace]],

        email: [null, [Validators.required, Validators.email,
          this.IsErrorState, this.ValidatorTrimSpace]],

        password: [null, [Validators.required, this.ValidatorTrimSpace,
          Validators.minLength(4), Validators.maxLength(10),
          Validators.nullValidator, this.IsErrorState]],

        confirmPassword: [null, [Validators.required, this.ValidatorTrimSpace,
          Validators.minLength(4), Validators.maxLength(10),
          Validators.nullValidator, this.IsErrorState]]

      },
      {

        validator: this.ComparePassword('password', 'confirmPassword')
      }
    );
  }

  onFormSubmit(form: NgForm) {
    if (this.registerForm.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    this.deleteTacked();
    this.authService.register(form).subscribe(() => {
      this.welcomeAnime();
      const timeout = setTimeout(() => {
        this.alertService.info(null, 'Before logging in, confirm the email.',
          true, true, 'client/sign-in', null);
        clearTimeout(timeout);
      }, 3500);
    }, (err) => {
      this.animation_wait.$anime_show.emit(false);
      console.log(err);
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

  ComparePassword(password: string, confirmPassword: string) {
    return (formGroup: UntypedFormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];
      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
        return;
      }
      if (control.value !== matchingControl.value) {
        this.messagePassword = 'Passwords are not the same.';
        matchingControl.setErrors({mustMatch: true});
      } else {
        this.messagePassword = '*required field';
        matchingControl.setErrors(null);
      }
    };
  }

  deleteTacked() {
    this.authService.logout();
  }
}


