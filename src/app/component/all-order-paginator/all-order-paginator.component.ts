import {Component, OnInit} from '@angular/core';
import {PreOrderShop} from '../entity/PreOrderShop';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {PageEvent} from '@angular/material/paginator';
import {PreOrderDto} from '../entity/PreOrderDto';
import {HttpClien} from '../service/clientservice.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {AlertServiceService} from '../service/alert-service.service';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';

@Component({
  selector: 'app-all-order-paginator',
  templateUrl: './all-order-paginator.component.html',
  styleUrls: ['./all-order-paginator.component.css']
})
export class AllOrderPaginatorComponent implements OnInit {
  paginatorViu = false;
  preOrderOpen: PreOrderShop[];
  pageIndex: number;
  pageSize: number;
  length: number;
  deviceIcon = faMobile;
  pageEvent: PageEvent;
  sally_button = faEdit;
  showClient = false;
  preorderDto: PreOrderDto;

  constructor(private clientHttp: HttpClien,
              private animation_wait: AnimeServiceService,
              private alert_service: AlertServiceService,
  ) {
  }

  ngOnInit(): void {
    this.getServerData(undefined);
  }

  public getServerData(event?: PageEvent) {
    if (event === undefined) {
      event = new PageEvent();
      event.pageSize = 10;
      event.pageIndex = 0;
    }
    this.animation_wait.$anime_show.emit(true);
    this.clientHttp.getPreorderPageableAll(event.pageIndex, event.pageSize).subscribe(
      response => {
        this.animation_wait.$anime_show.emit(false);
        this.preOrderOpen = response.content;
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

  showDevice(element: PreOrderShop) {
    this.clientHttp.getPreorderDtoById(element.orderId).subscribe(preorder => {
      this.preorderDto = preorder;
      this.showClient = true;
    });
  }

  hideClient() {
    this.showClient = false;
  }

  setNewDateFormat(date: Date): Date {
    return new Date(date);
  }

  open_popup(url: string) {
    console.log(url);
    console.log(url === null);
    if (url === null) {
      window.alert('Invoice is not present !!!');
      return;
    }
    window.open(url, 'Invoice', 'width=400px,height=500px');
  }
}
