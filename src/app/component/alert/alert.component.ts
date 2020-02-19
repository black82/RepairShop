import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input()
  errorMessage: string;
  @Input()
  hiddenAlert: boolean;
  @Input()
  position: string;
  @Input()
  error: HttpErrorResponse;
  @Input()
  typeAlert: string;
  @Output()
  alert_active: EventEmitter<any> = new EventEmitter();
  private styleTag: HTMLStyleElement;
  private title_alert: string;
  private body_alert: string;

  constructor() {

  }


  private static buildStyleElement(): HTMLStyleElement {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.setAttribute('data-debug', 'Injected by WindowScrolling service.');
    style.textContent = `
			body {
				overflow: hidden !important ;
			}
			.container .search {
        display: none;
			}
		`;
    return (style);
  }


  ngOnInit() {
    console.log(this.hiddenAlert, this.title_alert, this.body_alert);

    this.text_alert_initialized();
    this.styleTag = AlertComponent.buildStyleElement();

    this.disable();

    this.typeAlertFunc();
  }

  hide_alert(): void {
    this.alert_active.emit();
    this.enable();
    this.hiddenAlert = !this.hiddenAlert;
  }

  public disable(): void {
    document.body.appendChild(this.styleTag);
  }

  public enable(): void {
    document.body.removeChild(this.styleTag);
  }

  private text_alert_initialized(): void {
    switch (this.typeAlert) {
      case 'success': {
        this.title_alert = 'Ups : Is Ok';
        this.body_alert = 'Everything went well. Your operation is successfully completed.';
        break;
      }
      case 'error': {
        if (this.error === null || this.error === undefined) {
          this.error = new HttpErrorResponse({error: 'Unknown error', status: 404, statusText: 'an unknown error occurred'});
        }
        this.title_alert = 'Ups : Error Status' + this.error.status;
        this.body_alert = 'Something went wrong. Try again. Otherwise contact support.';
        break;
      }
      case 'warn': {
        this.title_alert = 'Ups : Waring';
        this.body_alert = 'Attention. Something\'s not right.';
        break;
      }
      default: {
        this.title_alert = 'Ups : Error Status';
        this.body_alert = 'Something went wrong. Try again. Otherwise contact support.';
      }
    }
  }

  private typeAlertFunc(): any {
    let color = '#F09EA3';

    if (this.typeAlert === 'success') {
      color = '#06D85F';

    }
    if (this.typeAlert === 'error') {
      this.typeAlert = '#F09EA3';


    }
    if (this.typeAlert === 'warn') {
      color = '#FFCC00';

    }
    return color;
  }

}
