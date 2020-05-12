import {EventEmitter, Injectable, Output} from '@angular/core';
import {PrintEntity} from '../entity/Print_Pojo';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailSenderService {
  @Output()
  email_send_event: EventEmitter<PrintEntity> = new EventEmitter();
  email_sent_send_success: EventEmitter<void> = new EventEmitter<void>();
  anime_question: Subject<boolean> = new Subject<boolean>();

  constructor() {
  }

  email_send(print_client: PrintEntity) {
    this.email_send_event.emit(print_client);
  }
}
