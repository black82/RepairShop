import {Component, OnDestroy, OnInit} from '@angular/core';

import {HttpErrorResponse} from '@angular/common/http';
import {AlertServiceService} from '../service/alert-service.service';
import {Alert, AlertType} from '../entity/AlertEntity';
import {NavigationStart, Router} from '@angular/router';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faBomb} from '@fortawesome/free-solid-svg-icons/faBomb';

import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';

import {faExclamationCircle} from '@fortawesome/free-solid-svg-icons/faExclamationCircle';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {faExclamationTriangle} from '@fortawesome/free-solid-svg-icons/faExclamationTriangle';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit, OnDestroy {
  title_alert: string;
  body_alert: string;
  icon: any;
  color_icon: any;
  info = faInfoCircle;
  exclamation = faExclamationCircle;
  error_status: number;
  alert_closet = false;
  exclamation_triangle = faExclamationTriangle;
  sucess = faCheckCircle;
  private subscription: Subscription;
  alerts: Alert[] = [];
  alert: Alert;
  private routeSubscription: Subscription;


  constructor(private alertService: AlertServiceService,
              private router: Router) {

  }

  ngOnInit() {
    this.subscription = this.alertService.alert_open
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
        if (alert?.message === 'Sorry, you left the module.') {
          this.router.navigate(alert.location).then();
        }
        this.alerts.push(alert);
        this.timeout_remove_alert(alert);
      });
    this.routeSubscription = this.router.events.subscribe(event => {
      if (event instanceof NavigationStart) {
        this.alerts.forEach(x => {
          this.removeAlert(x);
        });
      }
    });
  }

  timeout_remove_alert(alert: Alert) {
    if (!this.alert) {
      this.alert = alert;
      this.initAlert(alert);
      this.autoCloseAlert(alert);
    } else {
      this.removeAlert(this.alert);
      this.alert = alert;
      this.initAlert(alert);
      this.autoCloseAlert(alert);
    }
  }

  initAlert(alert: Alert) {
    if (alert.keepAfterRouteChange) {
      this.rout_Out_Alert(alert.location);
    }
    this.text_alert_initialized(alert);
  }

  success_alert() {
    const success = document.querySelector('.toast--green');
    if (success.classList.contains('hidden--alert')) {
      success.classList.remove('hidden--alert');
    }
    success.classList.add('show--alert');
  }

  removeAlert(alert: Alert) {
    if (this.alerts.includes(alert)) {
      const remove = document.querySelectorAll('.show--alert');
      if (remove) {
        remove?.forEach(value => {
          value?.classList.add('hidden--alert');
        });
        this.alerts.splice(this.alerts.indexOf(alert), 1);
        this.alert = null;
      }
    }
  }

  closeBaton(alert: Alert) {
    this.removeAlert(alert);
  }

  public text_alert_initialized(alert: Alert): void {
    switch (alert.type) {
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

        if (alert.errore === null || alert.errore === undefined) {
          alert.errore = new HttpErrorResponse({
            error: 'Unknown error',
            status: 404,
            statusText: 'an unknown error occurred'
          });
        }
        if (alert.errore.status === 0) {
          this.error_status = 500;
          this.title_alert = 'Oops : Error ';
          alert.message = 'The backend part did not give any answer.';
          this.error_alert();
          break;
        }
        this.error_status = alert.errore.status;
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

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.routeSubscription) {
      this.routeSubscription.unsubscribe();
    }
  }

  private autoCloseAlert(alert: Alert) {
    const timeout = setTimeout(() => {
      this.removeAlert(alert);
      clearTimeout(timeout);
    }, 3000);
  }
}
