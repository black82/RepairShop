import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  @Input()
  control: FormGroup;
  @Input()
  errorMessage: string;
  hiddenAlertB = true;
  @Input()
  position: string;
  @Input()
  error: HttpErrorResponse;
  valueChange: string;
  message: string [];
  typeAlert: boolean;

  constructor() {
  }


  ngOnInit() {
    if (this.errorMessage.includes('!!!')) {
      this.typeAlert = true;
      this.valuechange();
    } else {
      this.typeAlert = false;
    }
  }


  valuechange() {
    this.message = this.errorMessage.split('!!!');
    this.errorMessage = this.message[0];
    this.valueChange = this.message[1];
  }
}
