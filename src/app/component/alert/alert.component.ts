import {Component, OnInit} from '@angular/core';

import {HttpErrorResponse} from '@angular/common/http';
import {AlertServiceService} from '../service/alert-service.service';
import {Alert, AlertType} from '../entity/AlertEntity';
import {Router} from '@angular/router';
import {faCheckCircle} from '@fortawesome/free-solid-svg-icons/faCheckCircle';
import {faBomb} from '@fortawesome/free-solid-svg-icons/faBomb';
import {faRadiation} from '@fortawesome/free-solid-svg-icons/faRadiation';
import {faInfoCircle} from '@fortawesome/free-solid-svg-icons/faInfoCircle';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  private typeAlert: string;
  private fade = false;
  private styleTag: HTMLStyleElement;
  private title_alert: string;
  private body_alert: string;
  private alert: Alert;
  private icon: any;
  private color_icon: any;
  private info = faInfoCircle;

  constructor(private alertService: AlertServiceService, private router: Router) {

  }

  private static buildStyleElement(): HTMLStyleElement {
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

  private text_alert_initialized(): void {
    switch (this.alert.type) {
      case AlertType.Success: {
        this.color_icon = '#fff';
        this.icon = faCheckCircle;
        this.title_alert = ' Is Ok';
        this.body_alert = 'Everything went well. Your operation is successfully completed.';
        break;
      }
      case AlertType.Error: {
        this.color_icon = 'grey';
        this.icon = faBomb;
        if (this.alert.errore === null || this.alert.errore === undefined) {
          this.alert.errore = new HttpErrorResponse({error: 'Unknown error', status: 404, statusText: 'an unknown error occurred'});
        }
        this.title_alert = 'Oops : Error Status   ' + this.alert.errore.status;
        this.body_alert = 'Try again. Otherwise contact support.';
        break;
      }
      case AlertType.Warning: {
        this.color_icon = 'red';
        this.icon = faRadiation;
        this.title_alert = 'Oops : Waring';
        this.body_alert = 'Attention. Something\'s not right.';
        break;
      }
      default: {
        this.icon = faBomb;
        this.title_alert = 'Oops : Error';
        this.body_alert = 'Try again. Otherwise contact support.';
      }
    }
  }

  private typeAlertFunc(): any {
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

  private rout_Out_Alert(location: string): void {
    this.router.navigate([location]).then(r => r);
  }

}
