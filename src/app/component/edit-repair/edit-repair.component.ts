import {Component, OnDestroy, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {Subscription} from 'rxjs';
import {UntypedFormBuilder} from '@angular/forms';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {PrintService} from '../service/print.service';
import {FiltreMoreDeviceRepairActivService} from '../service/filtre-more-device-repair-activ.service';
import {FormhidenService} from '../service/formhiden.service';
import {faCircle} from '@fortawesome/free-solid-svg-icons';
import {ImageSenderService} from '../service/image-sender.service';
import {DeviceInputService} from '../service/device-input.service';

@Component({
  selector: 'app-edit-repair',
  templateUrl: './edit-repair.component.html',
  styleUrls: ['./edit-repair.component.css']
})
export class EditRepairComponent implements OnInit, OnDestroy {
  client: Client;
  show_client: boolean;
  id_repair: number;
  titleForm = 'Find the repair for editing based on Id';
  itemsModels: string[] = [];
  companyShow = false;
  formTitle = 'Find By Id';
  private id_repair_event: Subscription;
  homeButton = faCircle;


  constructor(private fb: UntypedFormBuilder,
              private httpService: HttpClien,
              private alert_service: AlertServiceService,
              private printService: PrintService,
              private  check_device: FiltreMoreDeviceRepairActivService,
              private hidden_form: FormhidenService,
              private imageSender: ImageSenderService,
              private deviceInput: DeviceInputService) {
  }

  ngOnInit(): void {
    this.id_repair_event = this.hidden_form.id_repair.subscribe(id => {
      this.id_repair = id;
    });


  }

  client_catch(client1): void {
    if (client1 as Client) {
      this.deviceInput.$clientRepairIdByRedact.emit(this.id_repair);
      this.deviceInput.$clientRedactEvent.emit(client1);
    }
  }


  ngOnDestroy(): void {
    if (this.id_repair_event) {
      this.id_repair_event.unsubscribe();
    }
  }
}
