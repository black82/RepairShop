import {Component, Input, OnInit} from '@angular/core';
import {SparePartsReturnDto} from "../entity/SparePartsReturnDto";
import {InvoiceToolsDto} from "../entity/InvoiceToolsDto";
import {PrintService} from "../service/print.service";
import {HttpClien} from "../service/clientservice.service";
import {AnimeServiceService} from "../service/anime-service.service";

@Component({
  selector: 'app-app-print-return',
  templateUrl: './app-print-return.component.html',
  styleUrls: ['./app-print-return.component.css']
})
export class AppPrintReturnComponent implements OnInit {
  @Input()
  spareReturn: SparePartsReturnDto;

  @Input()
  typeInput: string;

  @Input()
  positionCall:string;

  printPage = false;


  constructor(private print: PrintService, private http: HttpClien, private animation: AnimeServiceService) {
  }

  ngOnInit(): void {
    if (this.typeInput === 'full') {
      this.printPage = true;
    } else {
      if (this.spareReturn && this.spareReturn.id) {
        this.animation.$anime_show.emit(true);
        this.http.getSpareById(this.spareReturn.id).subscribe(p => {
          this.spareReturn = p;
          this.printPage = true;
          this.animation.$anime_show.emit(false);
        })
      }
    }

  }

  appendingHtmlToPrintPage() {
    let invoice: InvoiceToolsDto = new InvoiceToolsDto();
    invoice.htmlPage = document.getElementById('print_container').innerHTML
    this.print.print_open.emit(invoice);

    this.print.$success_print_to_send.subscribe(p => {

      this.dismissButton()

    });
  }

  dismissButton() {
    this.printPage = !this.printPage;
  }
}
