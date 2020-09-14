import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminServiceService} from '../service/admin-service.service';
import {MessageInvoice} from '../entity/MessageInvoice';
import {Subscription} from 'rxjs';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {WebSocketService} from '../service/WebSocketService';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-notifai-manage',
  templateUrl: './notifai-manage.component.html',
  styleUrls: ['./notifai-manage.component.css']
})
export class NotifaiManageComponent implements OnInit, OnDestroy {
  mail = faEnvelope;
  discar = faTrashAlt;
  messages: MessageInvoice;
  show_message = false;
  private subscription: Subscription;
  formMessage: FormGroup;

  constructor(private adminService: AdminServiceService,
              private webSocketService: WebSocketService,
              private http: HttpClien,
              private alertService: AlertServiceService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.subscription = this.adminService.$show_notified.subscribe(notify => {
      this.messages = notify;
      this.formMessage = this.fb.group({
        destination: [this.messages?.destination_user, [Validators.required, Validators.email]],
        subject: [this.messages.message_subject, [Validators.required]],
      });
      this.show_message = true;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resendMessage(message) {
    console.log(message);
    if (this.formMessage.controls.destination.value) {
      this.messages.destination_user = this.formMessage.controls.destination.value;
    }
    this.messages.message_subject = this.formMessage.controls.subject.value;
    this.http.retrySendInvoice(message).subscribe(() => {
      this.show_message = false;
      this.soundSend();
      this.adminService.$deleteMessage.emit(message);

    });
  }

  dismiss() {
    this.show_message = !this.show_message;
  }

  deleteMessage(messages: MessageInvoice) {
    this.show_message = false;
    this.adminService.$deleteMessage.emit(messages);

  }

  soundSend() {
    this.alertService.soundSend();
  }
}
