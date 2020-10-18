import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PrintService} from '../service/print.service';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css']
})
export class PrintPageComponent implements OnInit, OnDestroy {
  htmlToAdd: any;
  name_test_out: string[] = [];
  date: Date = new Date();
  type_print: number;
  date_exit: Date;
  client_date_input: Date;
  id: string;
  invoice_tools: InvoiceToolsDto = new InvoiceToolsDto();
  private print_open_event: Subscription;
  @ViewChild('printContainer') el: ElementRef;

  constructor(private print: PrintService) {
  }

  ngOnInit(): void {
    this.print_open_event = this.print.print_open.subscribe(print => {
      this.invoice_tools = print;
      this.appendingHtmlToPrintPage(print);
    });

  }

  appendingHtmlToPrintPage(invoice_tools: InvoiceToolsDto) {
    this.el.nativeElement.innerHTML = invoice_tools.htmlPage;
    this.borderDelete();
    window.print();
    this.print.$success_print.emit(true);
  }

  borderDelete() {
    const element = document.querySelector('.container-page') as HTMLElement;
    element.style.border = 'none';
  }

  ngOnDestroy(): void {
    if (this.print_open_event) {
      this.print_open_event.unsubscribe();
    }
  }
}
