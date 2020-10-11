import {EventEmitter, Injectable, Output} from '@angular/core';
import {PrintEntity} from '../entity/Print_Pojo';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  @Output()
  print_open: EventEmitter<PrintEntity> = new EventEmitter<PrintEntity>();
  @Output()
  invoice_make: EventEmitter<InvoiceToolsDto> = new EventEmitter<InvoiceToolsDto>();
  @Output()
  $success_print: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  $success_print_id: EventEmitter<number> = new EventEmitter<number>();

  constructor() {
  }

}
