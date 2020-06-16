import {Component, OnInit} from '@angular/core';
import {Client} from '../entity/ClientWeb';
import {AnimeServiceService} from '../service/anime-service.service';
import {HttpClien} from '../service/clientservice.service';
import {Device} from '../entity/Device';
import {Repair} from '../entity/Repair';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {ExtendDateService} from '../service/extend-date.service';

@Component({
  selector: 'app-divice-tumorow',
  templateUrl: './divice-tumorow.component.html',
  styleUrls: ['./divice-tumorow.component.css']
})
export class DiviceTumorowComponent implements OnInit {
  client_array: Array<Client> = new Array<Client>();
  show_devices = false;
  device: Device;
  repair: Repair;
  save = faMobileAlt;
  notdevice = false;
  isAdmin = false;
  showRepair = false;
  date = faCalendarPlus;

  constructor(private animation_wait: AnimeServiceService,
              private httpService: HttpClien,
              private extend_date_service: ExtendDateService) {
  }

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth() {
    const item = localStorage.getItem('token');
    if (item) {
      this.httpService.isAdmin(item).subscribe(value => {
        this.isAdmin = value;
      }, error => {
        console.log(error);
      });
    }
  }

  get_list_client() {
    this.animation_wait.$anime_show.emit(true);
    this.httpService.list_preparing_device().subscribe(value => {
      this.client_array = this.filerRepair(value);
      this.animation_wait.$anime_show.emit(false);
      if (this.client_array.length > 0) {
        this.show_devices = true;
      } else {
        this.notdevice = true;
      }
    }, error => {
      this.animation_wait.$anime_show.emit(false);
      console.error(error);
    });
  }

  filerRepair(clients: Client[]): Client[] {
    clients.forEach(client => {
      if (client.device.length > 1) {
        client.device.forEach(device => {
          let new_client = null;
          new_client = client;
          new_client.device = [];
          new_client.device.push(device);
          clients.push(new_client);
          if (device.repairs.length > 1) {
            device.repairs.forEach(repairs => {
              if (!repairs.nowInRepair) {
                device.repairs.splice(device.repairs.indexOf(repairs), 1);
              }
            });
          }
          clients.splice(clients.indexOf(client), 1);
        });
      }
    });
    clients = this.check_activ_device(clients);
    return clients;
  }


  extendDate(client: Client) {
    this.repair = client.device[0].repairs[0];
    this.extend_date_service.$repair_extend_date_modal.emit(this.repair);
  }

  private check_activ_device(clients: Client[]) {
    let device_acyiv = true;
    clients.forEach(client => {
      if (client.device.length > 0) {
        device_acyiv = false;
      } else {
        clients.splice(clients.indexOf(client), 1);
      }
    });
    if (device_acyiv) {
      return [];
    } else {
      return clients;
    }
  }
}