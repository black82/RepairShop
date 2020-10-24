import {Component, Input, OnInit} from '@angular/core';
import {HttpClien} from '../service/clientservice.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {AlertServiceService} from '../service/alert-service.service';
import {DeviceInputService} from '../service/device-input.service';
import {PageEvent} from '@angular/material/paginator';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons/faHandHoldingUsd';
import {DeviceForSaleTransaction} from '../entity/DeviceForSaleTransaction';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-device-sale-now-paginator',
  templateUrl: './device-sale-paginator.component.html',
  styleUrls: ['./device-sale-paginator.component.css']
})
export class DeviceSalePaginatorComponent implements OnInit {
  @Input()
  typeDate: string;
  paginatorViu = false;
  devicesForSale: DeviceForSaleTransaction[];
  pageIndex: number;
  pageSize: number;
  length: number;
  deviceIcon = faMobile;
  pageEvent: PageEvent;
  sally_button = faHandHoldingUsd;
  showClient = false;

  constructor(private clientHttp: HttpClien,
              private animation_wait: AnimeServiceService,
              private alert_service: AlertServiceService,
              private deviceService: DeviceInputService) {
  }

  ngOnInit(): void {
    this.getServerData(null);
  }

  public getServerData(event?: PageEvent) {
    if (event === undefined) {
      event = new PageEvent();
      event.pageSize = 10;
      event.pageIndex = 0;
    }
    this.animation_wait.$anime_show.emit(true);
    this.checkTypeDateToServer(event.pageIndex, event.pageSize).subscribe(
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

  showDevice(element: DeviceForSaleTransaction) {
    this.deviceService.$deviceForSaleClientTransaction.emit(element);
    this.showClient = true;
  }

  hideClient() {
    this.showClient = false;
  }

  checkTypeDateToServer(pageIndex: number, pageSize: number): Observable<any> {
    switch (this.typeDate) {
      case 'all': {
        return this.clientHttp.getDeviceSaleTransactionAllPageable(pageIndex, pageSize);
      }
      case 'isSale': {
        return this.clientHttp.getDeviceSaleTransactionAllPageable(pageIndex, pageSize);
      }
    }
  }
}
