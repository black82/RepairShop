import {Component, Input, OnDestroy, OnInit} from '@angular/core';
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
import {faEnvelope} from '@fortawesome/free-solid-svg-icons/faEnvelope';
import {faWhatsapp} from '@fortawesome/free-brands-svg-icons/faWhatsapp';
import {faSms} from '@fortawesome/free-solid-svg-icons/faSms';
import {faPrint} from '@fortawesome/free-solid-svg-icons/faPrint';
import {faFileSignature} from '@fortawesome/free-solid-svg-icons';
import {PrintService} from '../service/print.service';
import {InputOutputTestService} from '../service/input-output-test.service';


@Component({
  selector: 'app-email-modal',
  templateUrl: 'email-modal.component.html',
  styleUrls: ['./email-modal.component.css']
})
export class EmailModalComponent implements OnInit, OnDestroy {
  @Input()
  callerServiceType: string;
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
  mail = faEnvelope;
  email_send_disable: boolean;
  whatsapp = faWhatsapp;
  mms = faSms;
  printer = faPrint;
  redact = faFileSignature;
  private typeSender: string;
  private subscriptionPrintSuccess: Subscription;
  private invoice: InvoiceToolsDto;
  private subscriptionEmail: Subscription;

  constructor(private print: PrintService,
              private emailSender: EmailSenderService,
              private http: HttpClien,
              private alert_service: AlertServiceService,
              private sig_pad_service: SigPadService,
              private animation_wait: AnimeServiceService,
              private inputOutputTestCheck: InputOutputTestService) {

  }

  ngOnInit(): void {
    this.invoice = null;
    this.email_send_event = this.emailSender.email_send_event.subscribe(print => {
      this.images_sig = this.sig_pad_service.image_sig;
      this.print_entity = print;
      this.title = print.titleForm;
      this.checkIfEmailPresent(print.client_print);
      this.client = print.client_print;
      if (print.type_client_print === 1 || this.print_entity.type_client_print === 2) {
        this.id = this.id_repair(print.client_print);
      } else {
        if (print.type_client_print === 3) {
          this.id = print.client_print.deviceBay[0].idDeviceSale;
        }
        if (print.type_client_print === 4) {
          this.id = print.client_print.deviceSale[0].idDeviceSale;
        }
      }
      this.type_print = print.type_client_print;
      this.check_type_print(print);
      this.http.getNickNameCurrentStaffUser().subscribe(name => {
        this.userNickname = name.currentName;
        this.emailPage(print.client_print);
        this.animation_wait.$anime_show.emit(false);

      });
      this.print.invoice_make.subscribe(() => {
        this.print.$success_print.emit(true);
      });

      this.subscriptionPrintSuccess = this.print.$success_print.subscribe(value => {
        if (value) {
          this.submitForm();
        }
      });
      this.subscriptionEmail = this.emailSender.email_sent_send_success.subscribe(value => {
        if (value) {
          this.submitFormEmail();
        }
      });
    });
  }

  checkIfEmailPresent(clientPrint: Client) {
    this.email_send_disable = !clientPrint.email;
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
        this.checkIfIdNotNullAndCreateInvoice();
      });
    } else if (this.print_entity.type_client_print === 2) {
      this.http.outputDeviceForm(this.client.device[0].repairs[0],
        this.client.device[0].repairs[0].repair_Id).subscribe(response => {
        this.id = response.repairs[0].repair_Id.toString();
        this.checkIfIdNotNullAndCreateInvoice();
      });
    } else if (this.print_entity.type_client_print === 3) {
      this.http.bayingDeviceToClient(this.client).subscribe(response => {
        this.id = response.toString();
        this.checkIfIdNotNullAndCreateInvoice();
      });
    } else if (this.print_entity.type_client_print === 4) {
      this.http.saleDeviceToClient(this.client).subscribe(() => {
        this.id = this.client?.deviceSale[0]?.idDeviceSale?.toString();
        this.checkIfIdNotNullAndCreateInvoice();
      });
    }


  }

  checkIfIdNotNullAndCreateInvoice(): void {
    if (this.id || this.id === '') {
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
            this.createInvoiceToPrintPageAfterTimeout();
          }
        }
      }, 1000);
    } else {
      this.createInvoiceToPrintPageAfterTimeout();
    }
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
    this.invoice = this.createInvoiceToPage(html.innerHTML);
    this.checkTypeSender(this.invoice);
  }

  checkTypeSender(invoiceToPrintPage) {
    switch (this.typeSender) {
      case InvoiceType.emailInvoice: {
        this.sendEmailToBackend(invoiceToPrintPage);
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
      case InvoiceType.PrintPage: {
        this.savePrintPage(invoiceToPrintPage);
        break;
      }

    }
  }

  sendEmailToBackend(invoiceToolsDto) {
    this.show_email_send = false;
    this.animation_wait.$anime_show.emit(true);
    this.http.sendEmailClient(invoiceToolsDto).subscribe(() => {
      this.animation_wait.$anime_show.emit(false);
      this.emailSender.anime_question.emit(false);
      this.emailSender.email_sent_send_success.emit(true);
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
      this.emailSender.email_sent_send_success.emit(true);
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
      this.emailSender.email_sent_send_success.emit(true);
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


  check_type_print(printTypes: PrintEntity) {
    if (printTypes.type_client_print === 2) {
      this.check_test_OK(printTypes.client_print.device[0].repairs[0].inputModule);
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

  check_test_OK(inputTest: InputTest) {
    this.name_test_entre = [];
    this.name_test_entre = this.inputOutputTestCheck.inputTestCheck(inputTest);
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
    if (this.subscriptionEmail) {
      this.subscriptionEmail.unsubscribe();
    }
  }

  check_test_OK_out(outputTest: OutputTest) {
    this.name_test_out = [];
    this.name_test_out = this.inputOutputTestCheck.outputTestCheck(outputTest);
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
    switch (this.typeSender) {
      case InvoiceType.emailInvoice: {
        return InvoiceType.emailInvoice;
      }
      case InvoiceType.WhatsApp: {
        return InvoiceType.WhatsApp;

      }
      case InvoiceType.mms: {
        return InvoiceType.mms;

      }
      case InvoiceType.PrintPage: {
        return InvoiceType.PrintPage;
      }

    }
  }

  showModal() {
    this.show_email_alternative = !this.show_email_alternative;
  }

  checkDestinationInvoice(): string {
    switch (this.typeSender) {
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
      default: {
        if (this.typeSender !== InvoiceType.PrintPage) {
          this.alert_service.warn(null, 'Unfortunately, the recipient could not be chosen',
            false, false, null);
        }
        return;
      }
    }
  }

  checkTypeHtmlPage(html) {
    if (this.typeSender === InvoiceType.PrintPage) {
      return html;
    } else {
      return html.innerHTML;
    }
  }

  checkMessagesByType(): string {
    let messages;
    if (this.print_entity.type_client_print === 1) {
      messages = 'The device will be ready to date : ' + this.date_exit;
    } else if (this.print_entity.type_client_print === 2) {
      messages = 'Device was taken ex offices by the owner';
    } else if (this.print_entity.type_client_print === 3) {
      messages = 'The device was successfully purchased by the company';
    } else if (this.print_entity.type_client_print === 4) {
      messages = 'The device was successfully sold';
    }
    return messages;
  }

  checkTypeSubjectByType(): string {
    let subject;
    if (this.print_entity.type_client_print === 1 || this.print_entity.type_client_print === 2) {
      subject = 'RfvTechnology numero di riparazione -  ' + this.id;
    } else if (this.print_entity.type_client_print === 3 || this.print_entity.type_client_print === 4) {
      subject = 'RfvTechnology the commercial operation of the device is -  ' + this.id;
    }
    return subject;
  }

  clickEmailSender() {
    this.typeSender = InvoiceType.emailInvoice;
    this.ok();
  }

  clickWhatsappSender() {
    this.typeSender = InvoiceType.WhatsApp;
    this.ok();
  }

  clickMmsSender() {
    this.typeSender = InvoiceType.mms;
    this.ok();
  }

  savePrintPage(invoiceToPrintPage: InvoiceToolsDto) {
    const html = document.querySelector('.container-page');
    this.show_email_send = false;
    this.print.print_open.emit(invoiceToPrintPage);
    this.invoice.htmlPage = html.innerHTML;
    this.print.invoice_make.emit(this.invoice);
  }

  print_click() {
    this.typeSender = InvoiceType.PrintPage;
    this.ok();
  }

  edit_client() {
    this.show_email_send = false;
  }

  submitForm() {
    this.http.saved_print_page(this.invoice).subscribe(() => {
      this.print.$success_print_id.emit(Number(this.id));
    }, () => {
      this.animation_wait.$anime_show.emit(false);
    });

  }

  private createInvoiceToPage(html) {
    const invoiceToPrintPage = new InvoiceToolsDto();
    invoiceToPrintPage.destinationUser = this.checkDestinationInvoice();
    invoiceToPrintPage.subjectEmail = this.checkTypeSubjectByType();
    invoiceToPrintPage.messageEmail = this.checkMessagesByType();
    invoiceToPrintPage.typeSender = this.checkTypeSenderInvoice();
    invoiceToPrintPage.htmlPage = html;
    invoiceToPrintPage.repairID = Number(this.id);
    invoiceToPrintPage.typeFile = this.checkTypePrint();
    invoiceToPrintPage.callerServiceType = this.callerServiceType;
    return invoiceToPrintPage;
  }

  private submitFormEmail() {
    this.print.$success_print_id.emit(Number(this.id));
    this.animation_wait.$anime_show.emit(false);
  }
}


