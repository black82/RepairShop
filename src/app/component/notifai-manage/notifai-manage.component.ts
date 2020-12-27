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
import {faHistory} from '@fortawesome/free-solid-svg-icons/faHistory';
import {InvoiceType} from '../entity/InvoiceType';
import {faDolly} from '@fortawesome/free-solid-svg-icons/faDolly';

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
  hide_button = faHistory;
  doly = faDolly;
  invoiceTypes: string[];


  constructor(private adminService: AdminServiceService,
              private webSocketService: WebSocketService,
              private http: HttpClien,
              private alertService: AlertServiceService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initializeInvoiceType();
    this.subscription = this.adminService.$show_notified.subscribe(notify => {
        this.messages = notify;
      this.formMessage = this.fb.group({
        destination: [this.messages?.destination_user, [Validators.required, Validators.email]],
        subject: [this.messages.message_subject, [Validators.required]],
        type_sender: [this.messages.type_sender, [Validators.required]],
      });
      this.show_message = true;
    });
  }

  initializeInvoiceType() {
    this.invoiceTypes = Object.keys(InvoiceType);
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  resendMessage(message) {
    if (this.formMessage.controls.destination.value) {
      this.messages.destination_user = this.formMessage.controls.destination.value;
    }
    this.messages.message_subject = this.formMessage.controls.subject.value;
    this.http.retrySendInvoice(message).subscribe(() => {
      this.addAnimeEnvelop();
      this.soundSend();
      this.dismiss();
      this.adminService.$deleteMessage.emit(message);

    });
  }

  addAnimeEnvelop() {
    const elementById = document.getElementById('send-icon');
    const elementById1 = document.getElementById('envelop-header');
    if (elementById) {
      elementById.classList.add('anime-envelop');
    }
    if (elementById1) {
      elementById1.classList.add('anime-envelop');
    }
  }

  dismiss() {
    const elementById = document.getElementById('container-not');
    if (elementById) {
      elementById.classList.add('close-modal');
    }
    const timeout = setTimeout(() => {
      this.show_message = false;
      clearTimeout(timeout);
    }, 2000);

  }

  dismissButton() {
    this.show_message = false;
  }

  deleteMessage(messages: MessageInvoice) {
    this.show_message = false;
    this.adminService.$deleteMessage.emit(messages);

  }

  soundSend() {
    this.alertService.soundSend();
  }
}
