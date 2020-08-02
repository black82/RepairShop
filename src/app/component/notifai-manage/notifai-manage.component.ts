import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminServiceService} from '../service/admin-service.service';
import {MessageInvoice} from '../entity/MessageInvoice';
import {Subscription} from 'rxjs';
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons/faTrashAlt';
import {WebSocketService} from '../service/WebSocketService';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';

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

  constructor(private adminService: AdminServiceService,
              private webSocketService: WebSocketService,
              private http: HttpClien,
              private alertService: AlertServiceService) {
  }

  ngOnInit(): void {
    this.subscription = this.adminService.$show_notified.subscribe(notify => {
      this.messages = notify;
      this.show_message = true;
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resendMessage(message) {
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
