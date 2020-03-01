import {EventEmitter, Injectable, Output} from '@angular/core';
import {PrintEntity} from '../entity/Print_Pojo';

@Injectable({
  providedIn: 'root'
})
export class PrintService {
  @Output()
  print_open: EventEmitter<PrintEntity> = new EventEmitter<PrintEntity>();

  constructor() {
  }

  print_page(print_client: PrintEntity) {
    this.print_open.emit(print_client);
  }

}
