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

  constructor() {
  }

}
