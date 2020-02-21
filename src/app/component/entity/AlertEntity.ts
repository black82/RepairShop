import {HttpErrorResponse} from '@angular/common/http';

export class Alert {
  type: AlertType;
  message: string;
  errore: HttpErrorResponse;
  keepAfterRouteChange: boolean;
  fade: boolean;
  location: string;


  constructor(type: AlertType, message: string, errore: HttpErrorResponse,
              keepAfterRouteChange: boolean, fade: boolean, location: string) {
    this.type = type;
    this.message = message;
    this.errore = errore;
    this.keepAfterRouteChange = keepAfterRouteChange;
    this.fade = fade;
    this.location = location;
  }
}

export enum AlertType {
  Success,
  Error,
  Info,
  Warning
}
