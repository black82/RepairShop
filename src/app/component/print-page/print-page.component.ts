import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {PrintService} from '../service/print.service';
import {PrintEntity} from '../entity/Print_Pojo';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';
import {Subscription} from 'rxjs';
import {InvoiceType} from '../entity/InvoiceType';
import {HttpClien} from '../service/clientservice.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {InputTest} from '../entity/InputTest';
import {OutputTest} from '../entity/OutputTest';


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
  client_date_input: Date;
  id: string;
  invoice_tools: InvoiceToolsDto = new InvoiceToolsDto();
  print_entity: PrintEntity;
  private print_open_event: Subscription;
  userNickName: string;

  constructor(private print: PrintService,
              private http: HttpClien,
              private animation_wait: AnimeServiceService) {
  }

  ngOnInit(): void {
    this.print_open_event = this.print.print_open.subscribe(print => {
      console.log(print);
      this.client = print.client_print;
      this.print_entity = print;
      this.id = this.id_repair(print.client_print);
      this.type_print = print.type_client_print;
      this.name_test_entre = [];
      this.name_test_out = [];

      this.check_type_print(print);
      this.http.getNickNameCurrentStaffUser().subscribe(name => {
        this.userNickName = name.currentName;
        this.printPage();

      }, () => {
        this.animation_wait.$anime_show.emit(false);
      });


    });

  }

  check_type_print(printTypes: PrintEntity): void {
    if (printTypes.type_client_print === 2) {
      this.check_test_OK_out(printTypes.client_print.device[0].repairs[0].outputTest);
    }
    if (printTypes.type_client_print === 1) {
      this.check_test_OK(printTypes.client_print.device[0].repairs[0].inputModule);
      this.date_exit = printTypes.date_exit_device;
    }
    if (printTypes.type_client_print === 4) {
      this.check_test_OK_out(printTypes.client_print.deviceSale[0].outputTest);
    }
    if (printTypes.type_client_print === 3) {
      this.check_test_OK(printTypes.client_print.deviceBay[0].inputTest);
    }
  }

  setNewDateFormat(date: Date): Date {
    return new Date(date);
  }

  check_test_OK(inputTest: InputTest): void {
    this.name_test_entre = [];
    if (!inputTest.camera_input) {
      this.name_test_entre.push(' X Fotocamera difettosa ');
    }
    if (!inputTest.bluetooth) {
      this.name_test_entre.push(' X Bluetooh difettosa ');
    }
    if (!inputTest.vibrations) {
      this.name_test_entre.push(' X Vibrations difettosa ');
    }
    if (!inputTest.audio_equipment) {
      this.name_test_entre.push(' X Audio difettosa ');
    }
    if (!inputTest.software) {
      this.name_test_entre.push(' X Software difettosa ');
    }
    if (!inputTest.keyboard_input) {
      this.name_test_entre.push(' X La tastiera è danneggiata ');
    }
    if (!inputTest.sim_input) {
      this.name_test_entre.push(' X La scheda SIM è danneggiata o assente ');
    }
    if (!inputTest.microphone_input) {
      this.name_test_entre.push(' X Microfono difettoso ');
    }
    if (!inputTest.wi_fi_input) {
      this.name_test_entre.push(' X Il connettore Wi-Fi è difettoso ');
    }
    if (!inputTest.touch_input) {
      this.name_test_entre.push(' X Il sensore Touch è difettoso ');
    }
    if (!inputTest.sound_equipment_input) {
      this.name_test_entre.push(' X L\'apparecchiatura audio è difettosa ');
    }
    if (!inputTest.camera_input_front) {
      this.name_test_entre.push(' X Fotocamera Frontale difettosa ');
    }
    if (!inputTest.connectors_input) {
      this.name_test_entre.push(' X I Connettori del dispositivo sono difettosi ');
    }
    if (!inputTest.display_input) {
      this.name_test_entre.push(' X Il display del dispositivo è danneggiato ');
    }
    if (!inputTest.sensors_input) {
      this.name_test_entre.push(' X Il sensore del dispositivo è danneggiato ');
    }
    if (!inputTest.display_touch_input) {
      this.name_test_entre.push(' X Il display_touchy del dispositivo è danneggiato ');
    }
    if (!inputTest.faceIdInput) {
      this.name_test_entre.push(' X Il Face Id del dispositivo è danneggiato ');
    }

  }

  printPage(): void {
    console.log('print start' + this.client)
    // this.client = client;
    this.animation_wait.$anime_show.emit(false);
    const timeout = setTimeout(() => {
      // this.checkIfClickPrint();
      console.log(this.client);

      const html = document.querySelector('.container-page');
      window.print();
      this.createInvoiceToPrintPage(html.innerHTML);
      this.print.$success_print.emit(true);
      clearTimeout(timeout);
    }, 10000);

  }

  checkIfClickPrint() {
    if (window.matchMedia) {
      const mediaQueryList = window.matchMedia('print');
      mediaQueryList.addListener(mql => {
        if (mql.matches) {
        } else {

        }
      });
    }
    // const mediaQueryList1 = window.matchMedia('cancel');
    // mediaQueryList1.addListener(mql => {
    //   if (!mql.matches) {
    //     this.http.deleteDiscardRepair(this.client);
    //   }
    // });

  }


  check_test_OK_out(outputTest: OutputTest) {
    this.name_test_out = [];
    if (!outputTest.camera_Output) {
      this.name_test_out.push(' X Fotocamera difettosa ');
    }
    if (!outputTest.audio_equipment) {
      this.name_test_out.push(' X Speaker difettosa ');
    }
    if (!outputTest.software) {
      this.name_test_out.push(' X Software difettosa ');
    }
    if (!outputTest.vibrations) {
      this.name_test_out.push(' X Vibrations difettosa ');
    }
    if (!outputTest.bluetooth) {
      this.name_test_out.push(' X Bluetooh difettosa ');
    }
    if (!outputTest.camera_Output_Front) {
      this.name_test_out.push(' X Fotocamera Frontale difettosa ');
    }
    if (!outputTest.keyboard_Output) {
      this.name_test_out.push(' X La tastiera è danneggiata ');
    }
    if (!outputTest.sim_Output) {
      this.name_test_out.push(' X La scheda SIM è danneggiata o assente ');
    }
    if (!outputTest.microphone_Output) {
      this.name_test_out.push(' X Microfono difettoso ');
    }
    if (!outputTest.wi_fi_Output) {
      this.name_test_out.push(' X Il connettore Wi-Fi è difettoso ');
    }
    if (!outputTest.touch_Output) {
      this.name_test_out.push(' X Il sensore Touch è difettoso ');
    }
    if (!outputTest.sound_equipment_Output) {
      this.name_test_out.push(' X L\'apparecchiatura audio è difettosa ');
    }
    if (!outputTest.connectors_Output) {
      this.name_test_out.push(' X I Connettori del dispositivo sono difettosi ');
    }
    if (!outputTest.display_Output) {
      this.name_test_out.push(' X Il display del dispositivo è danneggiato ');
    }
    if (!outputTest.sensors_Output) {
      this.name_test_out.push(' X Il sensore del dispositivo è danneggiato ');
    }
    if (!outputTest.display_touch_Output) {
      this.name_test_out.push(' X Il display_touchy del dispositivo è danneggiato ');
    }
    if (!outputTest.faceIdOutput) {
      this.name_test_out.push(' X Il Face Id del dispositivo è danneggiato ');
    }
  }

  id_repair(client: Client): string {
    if (this.print_entity.type_client_print === 1 || this.print_entity.type_client_print === 2) {
      return client.device[0].repairs[0].repair_Id.toString();
    } else if (this.print_entity.type_client_print === 3) {
      return client.deviceBay[0].idDeviceSale.toString();
    } else if (this.print_entity.type_client_print === 4) {
      return client.deviceSale[0].idDeviceSale.toString();
    }
  }

  checkTypePrint(): string {
    switch (this.print_entity.type_client_print) {
      case 1: {
        return 'inputInvoice';
      }
      case 2: {
        return 'outputInvoice';
      }
      case 3: {
        return 'bayingInvoice';
      }
      case 4: {
        return 'sailingInvoice';
      }
    }
  }

  private createInvoiceToPrintPage(html) {
    this.invoice_tools.destinationUser = this.client.email;
    this.invoice_tools.htmlPage = html;
    this.invoice_tools.repairID = +this.id;
    this.invoice_tools.typeFile = this.checkTypePrint();
    this.invoice_tools.typeSender = InvoiceType.PrintPage;
    this.print.invoice_make.emit(this.invoice_tools);
  }

  ngOnDestroy(): void {
    if (this.print_open_event) {
      this.print_open_event.unsubscribe();
    }
  }
}
