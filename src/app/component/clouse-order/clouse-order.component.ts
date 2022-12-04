import {Component, OnDestroy, OnInit} from '@angular/core';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {PageEvent} from '@angular/material/paginator';
import {faHandHoldingUsd} from '@fortawesome/free-solid-svg-icons/faHandHoldingUsd';
import {HttpClien} from '../service/clientservice.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {AlertServiceService} from '../service/alert-service.service';
import {PreOrderShop} from '../entity/PreOrderShop';
import {PreOrderDto} from '../entity/PreOrderDto';
import {PrintEntity} from '../entity/Print_Pojo';
import {EmailSenderService} from '../service/email-sender.service';
import {Subscription} from 'rxjs';
import {faBox} from '@fortawesome/free-solid-svg-icons/faBox';
import {ClientStaticServiceService} from '../service/client-static-service.service';

@Component({
  selector: 'app-clouse-order',
  templateUrl: './clouse-order.component.html',
  styleUrls: ['./clouse-order.component.css']
})
export class ClouseOrderComponent implements OnInit, OnDestroy {

  paginatorViu = false;
  preOrderOpen: PreOrderShop[];
  pageIndex: number;
  pageSize: number;
  length: number;
  deviceIcon = faMobile;
  pageEvent: PageEvent;
  sally_button = faHandHoldingUsd;
  ordinateButton = faBox;
  showClient = false;
  preorderDto: PreOrderDto;
  private subscription: Subscription;

  constructor(private clientHttp: HttpClien,
              private animation_wait: AnimeServiceService,
              private alert_service: AlertServiceService,
              private emailService: EmailSenderService, public cl: ClientStaticServiceService) {
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
    this.clientHttp.getPreorderPageable(event.pageIndex, event.pageSize).subscribe(
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

  setNewDateFormat(date: Date): Date {
    return new Date(date);
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

  invoice_Update(type: number, preorders: PreOrderShop) {
    if (6 === type && preorders.completeDate === null) {
      alert('This order not closet');
      return;
    }
    this.clientHttp.getPreorderDtoById(preorders.orderId).subscribe(preorder => {
      this.submitFormUpdateInvoice(type, preorder, preorders);
    });

  }

  submitFormUpdateInvoice(type: number, preorders: PreOrderDto, preorderShop: PreOrderShop) {
    this.subscription = this.emailService.update_invoice_responses.subscribe(res => {
      this.animation_wait.$anime_show.emit(false);
      if (type === 5) {
        preorderShop.invoiceInput = res;
      } else {
        preorderShop.invoiceOutput = res;
      }
    });
    this.emailService.email_send(new PrintEntity(null,
      type, null,
      preorders.preOrderShop.orderId, null, 'Update Invoice', preorders));
  }

  open_popup(url: string) {
    if (url === null) {
      window.alert('Invoice is not present !!!');
      return;
    }
    window.open(url, 'Invoice', 'width=400px,height=500px');
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getColorByStatus(element: PreOrderShop) {
    if (element.orderStatus === null) {
      element.orderStatus = 'Ricevuto';
      return 'background: #1ABC9C;color:white;  border-radius: 5px;';
    } else if (element.orderStatus === 'Ricevuto') {
      return 'background: #1ABC9C;color:white;  border-radius: 5px;';
    } else if (element.orderStatus === 'Ordinato') {
      return 'background: #34495E;color:white;  border-radius: 5px;';
    }
  }

  changeStatusByOrdinate(order: PreOrderShop) {
    this.clientHttp.updateOrderStatusToOrdinate(order.orderId).subscribe(ord => {
      this.alert_service.success(null, 'L\'ordine ha cambiato il suo stato in ordinato!!!', false, false, '');
      this.clientHttp.getPreorderPageable(this.pageIndex, this.pageSize).subscribe(
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
    });
  }

}
