import {EventEmitter, Injectable, Output} from '@angular/core';
import {PrintEntity} from '../entity/Print_Pojo';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {
  @Output()
  email_send_event: EventEmitter<PrintEntity> = new EventEmitter();
  email_sent_send_success: EventEmitter<boolean> = new EventEmitter<boolean>();
  anime_question: EventEmitter<boolean> = new EventEmitter<boolean>();
  update_invoice_responses: EventEmitter<string> = new EventEmitter<string>();

  constructor() {
  }

  email_send(print_client: PrintEntity) {
    this.email_send_event.emit(print_client);
  }
}
