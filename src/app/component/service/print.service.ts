import {EventEmitter, Injectable, Output} from '@angular/core';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  @Output()
  print_open: EventEmitter<InvoiceToolsDto> = new EventEmitter<InvoiceToolsDto>();
  @Output()
  invoice_make: EventEmitter<InvoiceToolsDto> = new EventEmitter<InvoiceToolsDto>();
  @Output()
  $success_print: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  $success_print_to_send: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  $success_print_id: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

}
