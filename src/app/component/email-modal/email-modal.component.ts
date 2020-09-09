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
      this.client = print.client_print;
      this.id = this.id_repair(print.client_print);
      this.type_print = print.type_client_print;
      this.check_type_print(print);
      this.splitNotes(this.client.device[0].repairs[0].note);
      this.check_test_OK(print.client_print);
      this.http.getNickNameCurrentStaffUser().subscribe(name => {
        this.animation_wait.$anime_show.emit(false);
        this.userNickname = name.currentName;
        const timeout = setTimeout(() => {
          this.emailPage(print.client_print);
          clearTimeout(timeout);
        }, 1000);
      }, () => {
        this.animation_wait.$anime_show.emit(false);
      });

    });
  }


  ok() {
    if (this.print_entity.type_client_print === 1) {
      this.http.printClient(this.client).subscribe(response => {
        this.client = response;
        this.id = this.id_repair(response);
      });
    } else {
      this.http.outputDeviceForm(this.client.device[0].repairs[0],
        this.client.device[0].repairs[0].repair_Id).subscribe(response => {
        this.id = response.repairs[0].repair_Id.toString();
      });
    }
    const interval = setInterval(() => {
      if (this.id !== '') {
        this.emailSender.anime_question.next(true);
        const html = document.querySelector('.container-page');
        this.show_email_send = false;
        const invoiceToPrintPage = this.createInvoiceToPrintPage(html.innerHTML);
        this.sendEmailToBackend(invoiceToPrintPage);
        clearInterval(interval);
      }
    }, 300);

  }

  sendEmailToBackend(invoiceToolsDto) {
    this.animation_wait.$anime_show.emit(true);
    this.http.sendEmailClient(invoiceToolsDto).subscribe(() => {
      this.animation_wait.$anime_show.emit(false);
      this.emailSender.anime_question.next(false);
      this.emailSender.email_sent_send_success.emit(this.client);
    }, error => {
      this.animation_wait.$anime_show.emit(false);
      this.emailSender.anime_question.next(false);
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
      case 1: {
        return 'inputInvoice';
      }
      case 2: {

        return 'outputInvoice';
      }
    }
  }

  splitNotes(note: string) {
    console.log(this.notes);
    if (note) {
      this.notes = note.split(';');
    }

  }

  check_type_print(printTypes: PrintEntity) {
    if (printTypes.type_client_print === 2) {
      this.check_test_OK_out(printTypes.client_print);
    }
    if (printTypes.type_client_print === 1) {
      this.date_exit = printTypes?.date_exit_device;
    }
  }

  check_test_OK(client: Client) {
    this.name_test_entre = [];
    if (!client.device[0].repairs[0].inputModule.camera_input) {
      this.name_test_entre.push(' X Fotocamera difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.bluetooth) {
      this.name_test_entre.push(' X Bluetooh difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.vibrations) {
      this.name_test_entre.push(' X Vibrations difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.audio_equipment) {
      this.name_test_entre.push(' X Audio difettosa ');
    }
    if (!client.device[0].repairs[0].inputModule.software) {
      this.name_test_entre.push(' X Software difettosa ');
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
    if (!client.device[0].repairs[0].inputModule.camera_input_front) {
      this.name_test_entre.push(' X Fotocamera Frontale difettosa ');
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
    if (!client.device[0].repairs[0].inputModule.display_touch_input) {
      this.name_test_entre.push(' X Il display_touchy del dispositivo è danneggiato ');
    }

  }

  emailPage(client: Client): void {
    this.client = client;
    this.show_email_send = true;
  }

  ngOnDestroy(): void {
    if (this.email_send_event) {
      this.email_send_event.unsubscribe();
    }
  }

  check_test_OK_out(client: Client) {
    this.name_test_out = [];
    if (!client.device[0].repairs[0].outputTest.camera_Output) {
      this.name_test_out.push(' X Fotocamera difettosa ');
    }
    if (!client.device[0].repairs[0].outputTest.audio_equipment) {
      this.name_test_out.push(' X Speaker difettosa ');
    }
    if (!client.device[0].repairs[0].outputTest.software) {
      this.name_test_out.push(' X Software difettosa ');
    }
    if (!client.device[0].repairs[0].outputTest.vibrations) {
      this.name_test_out.push(' X Vibrations difettosa ');
    }
    if (!client.device[0].repairs[0].outputTest.bluetooth) {
      this.name_test_out.push(' X Bluetooh difettosa ');
    }
    if (!client.device[0].repairs[0].outputTest.camera_Output_Front) {
      this.name_test_out.push(' X Fotocamera Frontale difettosa ');
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
    if (!client.device[0].repairs[0].outputTest.display_touch_Output) {
      this.name_test_out.push(' X Il display_touchy del dispositivo è danneggiato ');
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

  private createInvoiceToPrintPage(html) {
    const invoiceToPrintPage = new InvoiceToolsDto();
    invoiceToPrintPage.destinationUser = this.client.email;
    invoiceToPrintPage.subjectEmail = 'RfvTechnology numero di riparazione -  ' + this.id;
    if (this.print_entity.type_client_print === 1) {
      invoiceToPrintPage.messageEmail = 'The device will be ready to date : ' + this.date_exit;
    } else {
      invoiceToPrintPage.messageEmail = 'Device was taken ex offices by the owner.';
    }
    invoiceToPrintPage.typeSender = InvoiceType.emailInvoice;
    invoiceToPrintPage.htmlPage = html;
    invoiceToPrintPage.repairID = +this.id;
    invoiceToPrintPage.typeFile = this.checkTypePrint();
    return invoiceToPrintPage;
  }

  showModal() {
    this.show_email_alternative = !this.show_email_alternative;
  }
}


