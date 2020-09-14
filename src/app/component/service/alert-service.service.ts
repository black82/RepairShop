import {EventEmitter, Injectable, Output} from '@angular/core';
import {Alert, AlertType} from '../entity/AlertEntity';
import {HttpErrorResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {
  @Output()
  alert_open: EventEmitter<Alert> = new EventEmitter<Alert>();


  success(type, message: string, keepAfterRouteChange: boolean, fade: boolean, location: string) {
    this.alert(new Alert(AlertType.Success, message, null, keepAfterRouteChange, fade, location));
  }

  error(type, message: string, keepAfterRouteChange: boolean, fade: boolean, location: string, errore: HttpErrorResponse) {
    this.alert(new Alert(AlertType.Error, message, errore, keepAfterRouteChange, fade, location));
  }

  info(type, message: string, keepAfterRouteChange: boolean, fade: boolean, location: string, errore: HttpErrorResponse) {
    this.alert(new Alert(AlertType.Info, message, errore, keepAfterRouteChange, fade, location));
  }

  warn(type: any, message: string, keepAfterRouteChange: boolean, fade: boolean, location: string, errore?: HttpErrorResponse) {
    this.alert(new Alert(AlertType.Warning, message, errore, keepAfterRouteChange, fade, location));
  }

  alert(alert: Alert) {
    this.alert_open.emit(alert);
  }

  soundAlert() {
    const audio = new Audio();
    audio.type = 'audio/mp3';
    audio.crossOrigin = 'anonimus';
    audio.src = './../assets/sound/hand-bell.mp3';
    audio.load();
    audio.play().then(r => r);
  }

  //
  soundSend() {
    const audio = new Audio();
    audio.crossOrigin = 'anonimus';
    audio.type = 'application/force-download';
    audio.src = './../assets/sound/sending.mp3';
    audio.load();
    audio.play().then(r => r);
  }
}

