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
import {faCheckSquare} from '@fortawesome/free-solid-svg-icons/faCheckSquare';


@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css'],
})
export class AlertComponent implements OnInit {
  typeAlert: string;
  fade = false;
  styleTag: HTMLStyleElement;
  title_alert: string;
  body_alert: string;
  alert: Alert;
  icon: any;
  color_icon: any;
  info = faInfoCircle;
  error_status: number;
  ok = faCheckSquare;

  constructor(private alertService: AlertServiceService, private router: Router) {

  }

  static buildStyleElement(): HTMLStyleElement {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.className = 'alert_css';
    style.setAttribute('data-debug', 'Injected by WindowScrolling service.');
    style.textContent = `
			.container {
				display: none;
			  }
		`;
    return (style);
  }

  ngOnInit() {
    this.styleTag = AlertComponent.buildStyleElement();
    this.alertService.alert_open
      .subscribe(alert => {
        this.alert = alert;
        this.initAlert();
      });
  }

  initAlert() {
    this.text_alert_initialized();
    this.disable();
    this.openCloseAlert();
  }

  removeAlert() {
    if (this.fade) {
      this.openCloseAlert();
    }
    this.enable();
    if (this.alert.keepAfterRouteChange) {
      this.rout_Out_Alert(this.alert.location);
    }
  }

  openCloseAlert() {
    this.fade = !this.fade;
  }

  public disable(): void {
    document.body.appendChild(this.styleTag);
  }

  public enable(): void {
    document.querySelector('body').removeChild(this.styleTag);
  }

  public text_alert_initialized(): void {
    switch (this.alert.type) {
      case AlertType.Success: {
        this.color_icon = '#06D85F';
        this.icon = faCheckCircle;
        this.title_alert = ' Is Ok';
        this.body_alert = 'Everything went well. Your operation is successfully completed.';
        break;
      }
      case AlertType.Error: {
        this.color_icon = '#F09EA3';
        this.icon = faTimesCircle;

        if (this.alert.errore === null || this.alert.errore === undefined) {
          this.alert.errore = new HttpErrorResponse({error: 'Unknown error', status: 404, statusText: 'an unknown error occurred'});
        }
        this.error_status = this.alert.errore.status;
        this.title_alert = 'Oops : Error ';
        this.body_alert = 'Try again. Otherwise contact support.';
        break;
      }
      case AlertType.Warning: {
        this.color_icon = '#FFCC00';
        this.icon = faExclamationCircle;
        this.title_alert = 'Oops : Waring';
        this.body_alert = 'Attention. Something\'s not right.';
        break;
      }
      default: {
        this.color_icon = '#F09EA3';
        this.icon = faBomb;
        this.title_alert = 'Oops : Error';
        this.body_alert = 'Try again. Otherwise contact support.';
      }
    }
  }

  public typeAlertFunc(): any {
    let color = '#F09EA3';

    if (this.alert.type === AlertType.Success) {
      color = '#06D85F';

    }
    if (this.alert.type === AlertType.Error) {
      this.typeAlert = '#FE1A00';
    }
    if (this.alert.type === AlertType.Warning) {
      color = '#FFCC00';

    }
    return color;
  }

  public rout_Out_Alert(location: string): void {
    this.router.navigate([location]).then(r => r);
  }

}
