import {Component, OnDestroy, OnInit} from '@angular/core';
import {PreOrderShop} from '../entity/PreOrderShop';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {PageEvent} from '@angular/material/paginator';
import {PreOrderDto} from '../entity/PreOrderDto';
import {HttpClien} from '../service/clientservice.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {AlertServiceService} from '../service/alert-service.service';
import {faEdit} from '@fortawesome/free-solid-svg-icons/faEdit';
import {PrintEntity} from '../entity/Print_Pojo';
import {EmailSenderService} from '../service/email-sender.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-all-order-paginator',
  templateUrl: './all-order-paginator.component.html',
  styleUrls: ['./all-order-paginator.component.css']
})
export class AllOrderPaginatorComponent implements OnInit, OnDestroy {
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
  private subscription: Subscription;

  constructor(private clientHttp: HttpClien,
              private animation_wait: AnimeServiceService,
              private alert_service: AlertServiceService,
              private emailService: EmailSenderService) {
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

  getStatusOrder(order: PreOrderShop): string {

    if (order.orderStatus === null && !order?.completeDate) {
      return 'Chiuso';
    } else {
      return order.orderStatus;
    }

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
      window.alert('Order not Closet !!!');
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
    if (element.orderStatus === null && element?.completeDate || element.orderStatus === 'Chiuso') {
      return 'background: #c54040;color:white;  border-radius: 5px;';
    } else if (element.orderStatus === 'Ricevuto') {
      return 'background: #1ABC9C;color:white;  border-radius: 5px;';
    } else if (element.orderStatus === 'Ordinato') {
      return 'background: #34495E;color:white;  border-radius: 5px;';
    }
  }

  invoice_OpenAlert() {
    this.alert_service.info(null, 'L\'ordine è aperto e non è possibile eseguire aggiornamenti!!!', false, false, '', null);
  }
}
