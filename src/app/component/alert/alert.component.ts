import {Component, OnInit} from '@angular/core';

import {HttpErrorResponse} from '@angular/common/http';
import {AlertServiceService} from '../service/alert-service.service';
import {Alert, AlertType} from '../entity/AlertEntity';
import {Router} from '@angular/router';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faBomb} from '@fortawesome/free-solid-svg-icons/faBomb';

import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';

import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {

  title_alert: string;
  body_alert: string;
  alert: Alert;
  icon: any;
  color_icon: any;
  info = faInfoCircle;
  error_status: number;
  alert_closet = false;
  private timeout: number;


  constructor(private alertService: AlertServiceService, private router: Router) {

  }

  ngOnInit() {
    this.alertService.alert_open
      .subscribe(alert => {
        if (alert.type === AlertType.Error) {
          if (alert.errore?.error?.status === 401) {
            this.body_alert = 'The time since the last login has expired.';
            this.info_alert();
            return;
          }
          if (alert.errore?.status === 401) {
            this.body_alert = 'Please sign in.';
            this.info_alert();
            return;
          }
        }
        this.alert = alert;
        if (alert?.message === 'Sorry, you left the module.') {
          this.router.navigate(alert.location).then();
        }
        this.timeout_remove_alert();
      });
  }

  timeout_remove_alert() {
    if (!document.querySelector('.show--alert')) {
      this.initAlert();
      this.timeout = setTimeout(() => {
        this.removeAlert();
        clearTimeout(this.timeout);
      }, 10000);
    } else {
      this.removeAlert();
      this.initAlert();
    }
  }

  initAlert() {
    this.text_alert_initialized();
  }

  success_alert() {
    const success = document.querySelector('.toast--green');
    success.classList.add('show--alert');
  }

  removeAlert() {
    const remove = document.querySelector('.show--alert');
    remove?.classList.add('hidden--alert');
    remove?.classList?.remove('show--alert');
    if (this.alert.keepAfterRouteChange) {
      this.rout_Out_Alert(this.alert.location);
    }
  }

  closeBaton() {
    clearTimeout(this.timeout);
    this.removeAlert();
  }

  public text_alert_initialized(): void {
    switch (this.alert.type) {
      case AlertType.Success: {
        this.color_icon = '#06D85F';
        this.icon = faCheckCircle;
        this.title_alert = ' Is Ok';
        this.body_alert = 'Everything went well. Your operation is successfully completed.';
        this.success_alert();
        break;
      }
      case AlertType.Error: {
        this.color_icon = '#F09EA3';
        this.icon = faTimesCircle;

        if (this.alert.errore === null || this.alert.errore === undefined) {
          this.alert.errore = new HttpErrorResponse({
            error: 'Unknown error',
            status: 404,
            statusText: 'an unknown error occurred'
          });
        }
        if (this.alert.errore.status === 0) {
          this.error_status = 500;
          this.title_alert = 'Oops : Error ';
          this.alert.message = 'The backend part did not give any answer.';
          this.error_alert();
          break;
        }
        this.error_status = this.alert.errore.status;
        this.title_alert = 'Oops : Error ';
        this.body_alert = 'Try again. Otherwise contact support.';
        this.error_alert();
        break;
      }
      case AlertType.Warning: {
        this.color_icon = '#FFCC00';
        this.icon = faExclamationCircle;
        this.title_alert = 'Oops : Waring';
        this.body_alert = 'Attention. Something\'s not right.';
        this.warning_alert();
        break;
      }
      case AlertType.Info: {
        this.color_icon = '#F09EA3';
        this.icon = faBomb;
        this.title_alert = 'Info';
        this.body_alert = 'Oops : It\'s a normal situation.';
        this.info_alert();
      }
    }
  }

  public rout_Out_Alert(location: string): void {
    this.router.navigate([location]).then(r => r);
  }


  error_alert() {
    const error_alert = document.querySelector('.toast--red');
    if (error_alert.classList.contains('hidden--alert')) {
      error_alert.classList.remove('hidden--alert');
    }
    error_alert.classList.add('show--alert');
  }

  warning_alert() {
    const warn_alert = document.querySelector('.toast--yellow');
    if (warn_alert.classList.contains('hidden--alert')) {
      warn_alert.classList.remove('hidden--alert');
    }
    warn_alert.classList.add('show--alert');
  }

  info_alert() {
    const info_alert = document.querySelector('.toast--blue');
    if (info_alert.classList.contains('hidden--alert')) {
      info_alert.classList.remove('hidden--alert');
    }
    info_alert.classList.add('show--alert');
  }
}
