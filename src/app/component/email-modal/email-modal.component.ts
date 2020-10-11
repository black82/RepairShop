import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';
import {PrintEntity} from '../entity/Print_Pojo';
import {EmailSenderService} from '../service/email-sender.service';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {SigPadService} from '../service/sig-pad.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {Subscription} from 'rxjs';
import {InvoiceType} from '../entity/InvoiceType';
import {InputTest} from '../entity/InputTest';
import {OutputTest} from '../entity/OutputTest';


@Component({
  selector: 'app-email-modal',
  templateUrl: 'email-modal.component.html',
  styleUrls: ['./email-modal.component.css']
})
export class EmailModalComponent implements OnInit, OnDestroy {
  client: Client;
  name_test_entre: string[] = [];
  name_test_out: string[] = [];
  date: Date = new Date();
  type_print: number;
  date_exit: Date;
  id = '';
  title: string;
  print_entity: PrintEntity;
  show_email_send = false;
  show_email_alternative = true;
  images_sig: string[] = [];
  private email_send_event: Subscription;
  userNickname: string;
  notes: string[] = [];

  constructor(private emailSender: EmailSenderService,
              private http: HttpClien,
              private alert_service: AlertServiceService,
              private sig_pad_service: SigPadService,
              private animation_wait: AnimeServiceService) {

  }

  ngOnInit(): void {
    this.images_sig = this.sig_pad_service.image_sig;
    this.email_send_event = this.emailSender.email_send_event.subscribe(print => {
      this.print_entity = print;
      this.title = print.titleForm;
      this.client = print.client_print;
      this.id = this.id_repair(print.client_print);
      this.type_print = print.type_client_print;
      this.check_type_print(print);
      this.http.getNickNameCurrentStaffUser().subscribe(name => {
        this.userNickname = name.currentName;
        const timeout = setTimeout(() => {
          this.emailPage(print.client_print);
          clearTimeout(timeout);
        }, 2000);
      }, () => {
        this.animation_wait.$anime_show.emit(false);
      });

    });
  }

  setNewDateFormat(date: Date): Date {
    return new Date(date);
  }

  ok() {
    if (this.print_entity.type_client_print === 1) {
      this.http.printClient(this.client).subscribe(response => {
        this.client = response;
        this.checkIsPhoneContain();
        this.checkIsImeiContain();
        this.id = this.id_repair(response);
      });
    } else if (this.print_entity.type_client_print === 2) {
      this.http.outputDeviceForm(this.client.device[0].repairs[0],
        this.client.device[0].repairs[0].repair_Id).subscribe(response => {
        this.id = response.repairs[0].repair_Id.toString();
      });
    } else if (this.print_entity.type_client_print === 3) {
      this.http.bayingDeviceToClient(this.client).subscribe(response => {
        this.id = response.toString();
      });
    } else if (this.print_entity.type_client_print === 4) {
      this.http.saleDeviceToClient(this.client).subscribe(response => {
        this.id = response?.toString();
      });
    }
    const interval = setInterval(() => {
      if (this.id !== '') {
        this.createInvoiceToPrintPageAfterTimeout();
        clearInterval(interval);
      } else if (this.print_entity.type_client_print === 1 || this.print_entity.type_client_print === 2) {
        if (this.client.device.length === 1 && this.client.device[0].repairs.length === 1) {
          this.id = this.client.device[0].repairs[0].repair_Id.toString();
          this.createInvoiceToPrintPageAfterTimeout();
        } else {
          this.id = this.id_repair(this.client);
          const timeout = setTimeout(() => {
            this.createInvoiceToPrintPageAfterTimeout();
            clearTimeout(timeout);
          }, 2000);

        }
      }
    }, 1000);

  }

  checkIsPhoneContain() {
    if (this.client?.telephone_number?.includes('n/a')) {
      this.client.telephone_number = null;
    }
  }

  checkIsImeiContain() {
    if (this.client?.device[0]?.imei.includes('n/a')) {
      this.client.device[0].imei = null;
    }
  }

  createInvoiceToPrintPageAfterTimeout() {
    this.emailSender.anime_question.emit(true);
    const html = document.querySelector('.container-page');
    this.show_email_send = false;
    const invoiceToPrintPage = this.createInvoiceToPrintPage(html.innerHTML);
    this.checkTypeSender(invoiceToPrintPage);
  }

  checkTypeSender(invoiceToPrintPage) {
    switch (this.print_entity.typeSender) {
      case InvoiceType.emailInvoice: {
        if (this.print_entity.type_client_print === 1 || this.print_entity.type_client_print === 2) {
          this.sendEmailToBackend(invoiceToPrintPage);
        } else {
          this.sendEmailToBackendBayDevice(invoiceToPrintPage);
        }
        break;
      }
      case InvoiceType.WhatsApp: {
        this.sendWhatsAppToBackend(invoiceToPrintPage);
        break;
      }
      case InvoiceType.mms: {
        this.sendMmsToBackend(invoiceToPrintPage);
        break;
      }

    }
  }

  sendEmailToBackend(invoiceToolsDto) {
    this.animation_wait.$anime_show.emit(true);
    this.http.sendEmailClient(invoiceToolsDto).subscribe(() => {
      this.animation_wait.$anime_show.emit(false);
      this.emailSender.anime_question.emit(false);
      this.emailSender.email_sent_send_success.emit(this.client);
    }, error => {
      this.animation_wait.$anime_show.emit(false);
      this.emailSender.anime_question.emit(false);
      this.alert_service.error(null, error.error.message
        , false, null, '', error);
    });
  }

  sendWhatsAppToBackend(invoiceToolsDto) {
    this.animation_wait.$anime_show.emit(true);
    this.http.sendWhatsAppClient(invoiceToolsDto).subscribe(() => {
      this.animation_wait.$anime_show.emit(false);
      this.emailSender.anime_question.emit(false);
      this.emailSender.email_sent_send_success.emit(this.client);
    }, error => {
      this.animation_wait.$anime_show.emit(false);
      this.emailSender.anime_question.emit(false);
      this.alert_service.error(null, error.error.message
        , false, null, '', error);
    });
  }

  sendMmsToBackend(invoiceToolsDto) {
    this.animation_wait.$anime_show.emit(true);
    this.http.sendMmsClient(invoiceToolsDto).subscribe(() => {
      this.animation_wait.$anime_show.emit(false);
      this.emailSender.anime_question.emit(false);
      this.emailSender.email_sent_send_success.emit(this.client);
    }, error => {
      this.animation_wait.$anime_show.emit(false);
      this.emailSender.anime_question.emit(false);
      this.alert_service.error(null, error.error.message
        , false, null, '', error);
    });
  }

  dismiss() {
    this.emailSender.email_sent_send_success.emit(null);
    this.show_email_send = false;


  }

  checkTypePrint(): string {
    switch (this.print_entity.type_client_print) {
      case 1:
      case 3: {
        return 'inputInvoice';
      }
      case 2:
      case 4: {

        return 'outputInvoice';
      }
    }
  }

  splitNotes(note: string) {
    if (note) {
      this.notes = note.split(';');
    }

  }

  check_type_print(printTypes: PrintEntity) {
    if (printTypes.type_client_print === 2) {
      this.check_test_OK_out(printTypes.client_print.device[0].repairs[0].outputTest);
    }
    if (printTypes.type_client_print === 1) {
      this.check_test_OK(printTypes.client_print.device[0].repairs[0].inputModule);
      this.date_exit = printTypes?.date_exit_device;
    }
    if (printTypes.type_client_print === 3) {
      this.check_test_OK(printTypes.client_print.deviceBay[0].inputTest);
    }
    if (printTypes.type_client_print === 4) {
      this.check_test_OK_out(printTypes.client_print.deviceSale[0].outputTest);
    }
  }

  check_test_OK(client: InputTest) {
    this.name_test_entre = [];
    if (!client.camera_input) {
      this.name_test_entre.push(' X Fotocamera difettosa ');
    }
    if (!client.bluetooth) {
      this.name_test_entre.push(' X Bluetooh difettosa ');
    }
    if (!client.vibrations) {
      this.name_test_entre.push(' X Vibrations difettosa ');
    }
    if (!client.audio_equipment) {
      this.name_test_entre.push(' X Audio difettosa ');
    }
    if (!client.software) {
      this.name_test_entre.push(' X Software difettosa ');
    }
    if (!client.keyboard_input) {
      this.name_test_entre.push(' X La tastiera è danneggiata ');
    }
    if (!client.sim_input) {
      this.name_test_entre.push(' X La scheda SIM è danneggiata o assente ');
    }
    if (!client.microphone_input) {
      this.name_test_entre.push(' X Microfono difettoso ');
    }
    if (!client.wi_fi_input) {
      this.name_test_entre.push(' X Il connettore Wi-Fi è difettoso ');
    }
    if (!client.touch_input) {
      this.name_test_entre.push(' X Il sensore Touch è difettoso ');
    }
    if (!client.sound_equipment_input) {
      this.name_test_entre.push(' X L\'apparecchiatura audio è difettosa ');
    }
    if (!client.camera_input_front) {
      this.name_test_entre.push(' X Fotocamera Frontale difettosa ');
    }
    if (!client.connectors_input) {
      this.name_test_entre.push(' X I Connettori del dispositivo sono difettosi ');
    }
    if (!client.display_input) {
      this.name_test_entre.push(' X Il display del dispositivo è danneggiato ');
    }
    if (!client.sensors_input) {
      this.name_test_entre.push(' X Il sensore del dispositivo è danneggiato ');
    }
    if (!client.display_touch_input) {
      this.name_test_entre.push(' X Il display_touchy del dispositivo è danneggiato ');
    }
    if (!client.faceIdInput) {
      this.name_test_entre.push(' X Il Face Id del dispositivo è danneggiato ');
    }
  }

  emailPage(client: Client): void {
    this.client = client;
    this.show_email_send = true;
    this.animation_wait.$anime_show.emit(false);
  }

  ngOnDestroy(): void {
    if (this.email_send_event) {
      this.email_send_event.unsubscribe();
    }
  }

  check_test_OK_out(client: OutputTest) {
    this.name_test_out = [];
    if (!client.camera_Output) {
      this.name_test_out.push(' X Fotocamera difettosa ');
    }
    if (!client.audio_equipment) {
      this.name_test_out.push(' X Speaker difettosa ');
    }
    if (!client.software) {
      this.name_test_out.push(' X Software difettosa ');
    }
    if (!client.vibrations) {
      this.name_test_out.push(' X Vibrations difettosa ');
    }
    if (!client.bluetooth) {
      this.name_test_out.push(' X Bluetooh difettosa ');
    }
    if (!client.camera_Output_Front) {
      this.name_test_out.push(' X Fotocamera Frontale difettosa ');
    }
    if (!client.keyboard_Output) {
      this.name_test_out.push(' X La tastiera è danneggiata ');
    }
    if (!client.sim_Output) {
      this.name_test_out.push(' X La scheda SIM è danneggiata o assente ');
    }
    if (!client.microphone_Output) {
      this.name_test_out.push(' X Microfono difettoso ');
    }
    if (!client.wi_fi_Output) {
      this.name_test_out.push(' X Il connettore Wi-Fi è difettoso ');
    }
    if (!client.touch_Output) {
      this.name_test_out.push(' X Il sensore Touch è difettoso ');
    }
    if (!client.sound_equipment_Output) {
      this.name_test_out.push(' X L\'apparecchiatura audio è difettosa ');
    }
    if (!client.connectors_Output) {
      this.name_test_out.push(' X I Connettori del dispositivo sono difettosi ');
    }
    if (!client.display_Output) {
      this.name_test_out.push(' X Il display del dispositivo è danneggiato ');
    }
    if (!client.sensors_Output) {
      this.name_test_out.push(' X Il sensore del dispositivo è danneggiato ');
    }
    if (!client.display_touch_Output) {
      this.name_test_out.push(' X Il display_touchy del dispositivo è danneggiato ');
    }
    if (!client.faceIdOutput) {
      this.name_test_out.push(' X Il Face Id del dispositivo è danneggiato ');
    }
  }

  id_repair(client: Client): string {
    if (client.id != null) {
      let id = 0;
      if (this.print_entity?.id) {
        return this.print_entity?.id.toString();
      }
      client.device.forEach(device => {
        if (device.rightNowInRepair) {
          device.repairs.forEach(repair => {
            if (repair.nowInRepair) {
              id = repair.repair_Id;
            }
          });
        }
      });
      return id.toString();
    } else {
      return '';
    }
  }

  checkTypeSenderInvoice(): string {
    switch (this.print_entity.typeSender) {
      case InvoiceType.emailInvoice: {
        return InvoiceType.emailInvoice;
      }
      case InvoiceType.WhatsApp: {
        return InvoiceType.WhatsApp;

      }
      case InvoiceType.mms: {
        return InvoiceType.mms;

      }

    }
  }

  showModal() {
    this.show_email_alternative = !this.show_email_alternative;
  }

  checkDestinationInvoice(): string {
    switch (this.print_entity.typeSender) {
      case InvoiceType.emailInvoice:
      case InvoiceType.email: {
        return this.client.email;
      }
      case InvoiceType.WhatsApp: {
        return this.client.telephone_number;

      }
      case InvoiceType.mms: {
        return this.client.telephone_number;

      }

    }
  }

  private createInvoiceToPrintPage(html) {
    const invoiceToPrintPage = new InvoiceToolsDto();
    invoiceToPrintPage.destinationUser = this.checkDestinationInvoice();
    invoiceToPrintPage.subjectEmail = 'RfvTechnology numero di riparazione -  ' + this.id;
    if (this.print_entity.type_client_print === 1) {
      invoiceToPrintPage.messageEmail = 'The device will be ready to date : ' + this.date_exit;
    } else {
      invoiceToPrintPage.messageEmail = 'Device was taken ex offices by the owner.';
    }
    invoiceToPrintPage.typeSender = this.checkTypeSenderInvoice();
    invoiceToPrintPage.htmlPage = html;
    invoiceToPrintPage.repairID = +this.id;
    invoiceToPrintPage.typeFile = this.checkTypePrint();
    return invoiceToPrintPage;
  }

  private sendEmailToBackendBayDevice(invoiceToPrintPage: InvoiceToolsDto) {
    this.animation_wait.$anime_show.emit(true);
    this.http.sendEmailClientDeviceSale(invoiceToPrintPage).subscribe(() => {
      this.animation_wait.$anime_show.emit(false);
      this.emailSender.anime_question.emit(false);
      this.emailSender.email_sent_send_success.emit(this.client);
    }, error => {
      this.animation_wait.$anime_show.emit(false);
      this.emailSender.anime_question.emit(false);
      this.alert_service.error(null, error.error.message
        , false, null, '', error);
    });
  }
}


