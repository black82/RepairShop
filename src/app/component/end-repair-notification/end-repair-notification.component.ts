import {Component, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {FormhidenService} from '../service/formhiden.service';
import {faCommentDollar, faEnvelope} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-end-repair-notification',
  templateUrl: './end-repair-notification.component.html',
  styleUrls: ['./end-repair-notification.component.css']
})
export class EndRepairNotificationComponent implements OnInit {
  client: Client;
  titleForm = 'Find the customer you want to send notification of after the Repair Id';
  button_text = 'Search by Id';
  sendSmsShow = false;
  sendEmailShow = false;
  checkTypeSender = false;
  smsIcon = faCommentDollar;
  emailIcon = faEnvelope;

  constructor(private hidden_form: FormhidenService) {
  }

  ngOnInit(): void {
  }

  client_catch(client1): void {
    if (client1 as Client) {
      this.client = client1;
      this.hidden_form.form_open.emit(true);
      this.checkClientTypeSender();
    }
  }

  showSms() {
    this.sendEmailShow = false;
    this.sendSmsShow = !this.sendSmsShow;
  }

  showEmail() {
    this.sendSmsShow = false;
    this.sendEmailShow = !this.sendEmailShow;
  }

  private checkClientTypeSender() {
    if (this.client.email == null) {
      this.sendEmailShow = true;
    } else {
      this.checkTypeSender = true;
    }
  }
}
