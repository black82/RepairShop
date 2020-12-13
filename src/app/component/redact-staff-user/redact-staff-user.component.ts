import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {faShare} from '@fortawesome/free-solid-svg-icons';
import {AdminServiceService} from '../service/admin-service.service';
import {StaffUser} from '../entity/StaffUser';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-redact-staff-user',
  templateUrl: './redact-staff-user.component.html',
  styleUrls: ['./redact-staff-user.component.css']
})
export class RedactStaffUserComponent implements OnInit, OnDestroy {

  save = faShare;
  staffUserForm: FormGroup;
  isAdmin = false;
  staffUser: StaffUser;
  view = false;
  private subscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private httpClient: HttpClien,
              private alertService: AlertServiceService,
              private adminService: AdminServiceService) {
  }

  ngOnInit(): void {
    this.subscription = this.adminService.$user_redact.subscribe(val => {
      this.staffUser = val;
      this.createForm();
      this.view = true;
    });
  }

  createForm(): void {
    this.staffUserForm = this.formBuilder.group({

      email: [this.staffUser.email, [Validators.required, Validators.email]],

      name: [null, [Validators.required,
        this.IsErrorState, this.ValidatorTrimSpace]],
      technicName: [null, [Validators.required, this.IsErrorState, this.ValidatorTrimSpace]]
    });
  }

  submitForm() {
    if (this.staffUserForm.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    this.httpClient.redactStaffUser(this.createStaffUserForm()).subscribe((() => {
      this.alertService.success('', 'Staff User Saved', false, false, '');
      this.dismissButton();
    }));
  }

  IsErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
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

  createStaffUserForm(): StaffUser {
    return new StaffUser(this.staffUser.email, this.staffUserForm.controls.name.value, this.staffUser.enabled, this.staffUser.confirmEmail,
      this.staffUser.roles_users, this.staffUserForm.controls.technicName.value);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  dismissButton() {
    this.view = false;
  }
}
