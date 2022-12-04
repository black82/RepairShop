import {Component, Input, OnInit} from '@angular/core';
import {DeviceForSale} from '../entity/DeviceForSale';
import {HttpClien} from '../service/clientservice.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {AlertServiceService} from '../service/alert-service.service';
import {PageEvent} from '@angular/material/paginator';
import {faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons/faHandHoldingUsd';
import {DeviceInputService} from '../service/device-input.service';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {ClientStaticServiceService} from '../service/client-static-service.service';

@Component({
  selector: 'app-pageable-device-sale',
  templateUrl: './pageable-device-sale.component.html',
  styleUrls: ['./pageable-device-sale.component.css']
})
export class PageableDeviceSaleComponent implements OnInit {
  @Input()
  buttonEditable: boolean;
  @Input()
  buttonWiu: boolean;
  paginatorViu = false;
  devicesForSale: DeviceForSale[];
  pageIndex: number;
  pageSize: number;
  length: number;
  deviceIcon = faMobile;
  pageEvent: PageEvent;
  sally_button = faHandHoldingUsd;

  constructor(private clientHttp: HttpClien,
              private animation_wait: AnimeServiceService,
              private alert_service: AlertServiceService,
              private deviceService: DeviceInputService, public cl: ClientStaticServiceService) {
  }

  ngOnInit(): void {
    this.getServerData(undefined);
  }

  sally(element: DeviceForSale) {
    this.deviceService.$deviceForSaleClient.emit(element);
    this.paginatorViu = false;
  }

  public getServerData(event?: PageEvent) {
    if (event === undefined) {
      event = new PageEvent();
      event.pageSize = 10;
      event.pageIndex = 0;
    }
    this.animation_wait.$anime_show.emit(true);
    this.clientHttp.getDeviceSalePageable(event.pageIndex, event.pageSize).subscribe(
      response => {
        this.animation_wait.$anime_show.emit(false);
        this.devicesForSale = response.content;
        this.pageIndex = response.pageable.pageNumber;
        this.pageSize = response.pageable.pageSize;
        this.length = response.totalElements;
        this.paginatorViu = true;

      },
      () => {
        this.animation_wait.$anime_show.emit(false);
        this.paginatorViu = false;
      }
    );
    this.paginatorViu = true;
    return event;
  }
}
