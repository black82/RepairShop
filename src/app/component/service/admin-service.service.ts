import {EventEmitter, Injectable, Output} from '@angular/core';
import {MessageInvoice} from '../entity/MessageInvoice';
import {StaffUser} from '../entity/StaffUser';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {
  @Output()
  $admin_show: EventEmitter<boolean> = new EventEmitter();
  @Output()
  $show_notified: EventEmitter<MessageInvoice> = new EventEmitter();
  @Output()
  $deleteMessage: EventEmitter<MessageInvoice> = new EventEmitter();
  @Output()
  $user_show: EventEmitter<boolean> = new EventEmitter();
  @Output()
  $user_redact: EventEmitter<StaffUser> = new EventEmitter();

  constructor() {
  }

}
