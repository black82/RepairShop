import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {PrintService} from '../service/print.service';
import {PrintEntity} from '../entity/Print_Pojo';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';


@Component({
  selector: 'app-print-page',
  templateUrl: './print-page.component.html',
  styleUrls: ['./print-page.component.css']
})
export class PrintPageComponent implements OnInit, OnDestroy {
  client: Client;
  name_test_entre: string[] = [];
  name_test_out: string[] = [];
  date: Date = new Date();
  type_print: number;
  date_exit: Date;
  id: string;
  invoice_tools: InvoiceToolsDto = new InvoiceToolsDto();
  print_entity: PrintEntity;

  constructor(private print: PrintService) {
  }

  ngOnInit(): void {
    this.print.print_open.subscribe(print => {
      this.print_entity = print;
      this.id = this.id_repair(print.client_print);
      this.type_print = print.type_client_print;
      this.name_test_entre = [];
      this.name_test_out = [];
      this.check_type_print(print);
      this.check_test_OK(print.client_print);
      setTimeout(() => this.printPage(print.client_print), 200);

    });

  }

  check_type_print(printTypes: PrintEntity) {
    if (printTypes.type_client_print === 2) {
      this.check_test_OK_out(printTypes.client_print);
    }
    if (printTypes.type_client_print === 1) {
      this.date_exit = printTypes.date_exit_device;
    }
  }

  check_test_OK(client: Client) {
    if (!client.device[0].repairs[0].inputModule.camera_input) {
      this.name_test_entre.push(' X Fotocamera difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.keyboard_input) {
      this.name_test_entre.push(' X La tastiera è danneggiata ');
    }
    if (!client.device[0].repairs[0].inputModule.sim_input) {
      this.name_test_entre.push(' X La scheda SIM è danneggiata o assente ');
    }
    if (!client.device[0].repairs[0].inputModule.microphone_input) {
      this.name_test_entre.push(' X Microfono difettoso ');
    }
    if (!client.device[0].repairs[0].inputModule.wi_fi_input) {
      this.name_test_entre.push(' X Il connettore Wi-Fi è difettoso ');
    }
    if (!client.device[0].repairs[0].inputModule.touch_input) {
      this.name_test_entre.push(' X Il sensore Touch è difettoso ');
    }
    if (!client.device[0].repairs[0].inputModule.sound_equipment_input) {
      this.name_test_entre.push(' X L\'apparecchiatura audio è difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.connectors_input) {
      this.name_test_entre.push(' X I Connettori del dispositivo sono difettosi ');
    }
    if (!client.device[0].repairs[0].inputModule.display_input) {
      this.name_test_entre.push(' X Il display del dispositivo è danneggiato ');
    }
    if (!client.device[0].repairs[0].inputModule.sensors_input) {
      this.name_test_entre.push(' X Il sensore del dispositivo è danneggiato ');
    }
  }

  printPage(client: Client): void {

    this.client = client;
    setTimeout(() => {
      const html = document.querySelector('.container-page');
      window.print();
      this.createInvoiceToPrintPage(html.innerHTML);
    }, 1000);

  }

  ngOnDestroy(): void {
    this.print.print_open.unsubscribe();
  }

  check_test_OK_out(client: Client) {
    if (!client.device[0].repairs[0].outputTest.camera_Output) {
      this.name_test_out.push(' X Fotocamera difettosa ');
    }
    if (!client.device[0].repairs[0].outputTest.keyboard_Output) {
      this.name_test_out.push(' X La tastiera è danneggiata ');
    }
    if (!client.device[0].repairs[0].outputTest.sim_Output) {
      this.name_test_out.push(' X La scheda SIM è danneggiata o assente ');
    }
    if (!client.device[0].repairs[0].outputTest.microphone_Output) {
      this.name_test_out.push(' X Microfono difettoso ');
    }
    if (!client.device[0].repairs[0].outputTest.wi_fi_Output) {
      this.name_test_out.push(' X Il connettore Wi-Fi è difettoso ');
    }
    if (!client.device[0].repairs[0].outputTest.touch_Output) {
      this.name_test_out.push(' X Il sensore Touch è difettoso ');
    }
    if (!client.device[0].repairs[0].outputTest.sound_equipment_Output) {
      this.name_test_out.push(' X L\'apparecchiatura audio è difettosa ');
    }
    if (!client.device[0].repairs[0].outputTest.connectors_Output) {
      this.name_test_out.push(' X I Connettori del dispositivo sono difettosi ');
    }
    if (!client.device[0].repairs[0].outputTest.display_Output) {
      this.name_test_out.push(' X Il display del dispositivo è danneggiato ');
    }
    if (!client.device[0].repairs[0].outputTest.sensors_Output) {
      this.name_test_out.push(' X Il sensore del dispositivo è danneggiato ');
    }
  }

  id_repair(client: Client): string {
    return client.device[0].repairs[0].repair_Id.toString();
  }

  checkTypePrint(): string {
    switch (this.print_entity.type_client_print) {
      case 1: {
        return 'inputInvoice';
      }
      case 2: {
        return 'outputInvoice';
      }
    }
  }

  private createInvoiceToPrintPage(html) {
    this.invoice_tools.destinationUser = this.client.email;
    this.invoice_tools.htmlPage = html;
    this.invoice_tools.repairID = +this.id;
    this.invoice_tools.typeFile = this.checkTypePrint();
    this.print.invoice_make.emit(this.invoice_tools);
  }
}
