import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Client} from '../entity/ClientWeb';
import {Repair} from '../entity/Repair';
import {InvoiceToolsDto} from '../entity/InvoiceToolsDto';
import {Device} from '../entity/Device';
import {AdminServiceService} from './admin-service.service';
import {StaffUser} from '../entity/StaffUser';
import {StatisticModel} from '../entity/StatisticModel';
import {StatisticModelParts} from '../entity/StatisticModelParts';
import {MessageInvoice} from '../entity/MessageInvoice';
import {UserStaffNickNamePojo} from '../entity/UserStaffNickNamePojo';
import {PasswordRecoveryPojo} from '../entity/PasswordRecoveryPojo';
import {DeviceForSaleTransaction} from '../entity/DeviceForSaleTransaction';
import {InvoiceRepairModel} from '../entity/InvoiceRepairModel';
import {InvoiceShopModels} from '../entity/InvoiceShopModels';
import {PreOrderDto} from '../entity/PreOrderDto';
import {PreOrderShop} from '../entity/PreOrderShop';
import {InvoiceOrderModel} from '../entity/InvoiceOrderModel';
import {environment} from '../../../environments/environment';
import {SparePartsReturnDto} from "../entity/SparePartsReturnDto";


@Injectable({
  providedIn: 'root'
})
export class HttpClien {
  handler: any;
  // apiUrl = 'https://rfvtechnology.eu/';

  apiUrl = environment.apiUrl;


  constructor(private http: HttpClient,
              private adminService: AdminServiceService) {
  }

  printClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + 'api/print/client', client)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  bayingDeviceToClient(client: Client): Observable<number> {
    return this.http.post<number>(this.apiUrl + 'api/device/baying', client)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  updateInvoice(invoice: InvoiceToolsDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'message/api/update/invoice', invoice)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  saleDeviceToClient(client: Client): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/device/sale', client)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  orderCreate(preOrderDto: PreOrderDto): Observable<PreOrderShop> {
    return this.http.post<PreOrderShop>(this.apiUrl + 'api/order/saved', preOrderDto)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  orderEdit(preOrderShop: PreOrderShop): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/order/edit', preOrderShop)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  orderClose(preOrderDto: PreOrderDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/order/close/order', preOrderDto)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  saved_print_page(invoiceToolsDto: InvoiceToolsDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/saved/print/page', invoiceToolsDto)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  searchByTelephoneNumber(telephone: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + 'api/search/number', {
      params: new HttpParams().set('telephone', telephone)
    }).pipe(
      catchError(
        this.errorHandler)
    );
  }

  searchByTImei(imei: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + 'api/search/imei/number', {
      params: new HttpParams().set('imei', imei)
    }).pipe(
      catchError(
        this.errorHandler)
    );
  }

  searchByRepairIdAndRepairArhiv(repairId: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + 'api/search/number', {
      params: new HttpParams().set('repair', repairId)
    })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  searchByRepairId(repairId: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + 'api/search/repair/number', {
      params: new HttpParams().set('id', repairId)
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  searchRepairByRepairId(repairId: string): Observable<Repair> {
    return this.http.get<Repair>(this.apiUrl + 'api/search/repair/id', {
      params: new HttpParams().set('id', repairId)
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  searchByEmail(email: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + 'api/search/email', {
      params: new HttpParams().set('email', email)
    }).pipe(
      catchError(
        this.errorHandler
      ));

  }

  outputDeviceForm(repair: Repair, id: number): Observable<Device> {
    return this.http.post<Device>(this.apiUrl + 'api/create/client/return/device/' + id, repair)
      .pipe(
        catchError(this.errorHandler)
      );

  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/auth/' + 'login', data)
      .pipe(
        tap(() => {
          localStorage.setItem('is_login', new Date(new Date().getTime() + +3600 * 1000).toString());

        }),
        catchError(this.errorHandler)
      );

  }

  logout(): void {

    this.http.post(this.apiUrl + 'api/auth/logout', {}, {withCredentials: true}).subscribe(() => {
      this.adminService.$admin_show.emit(false);
      this.adminService.$user_show.emit(false);
      localStorage.clear();
    });
  }

  register(data: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + 'api/auth/' + 'register', data)
      .pipe(
        catchError(this.errorHandler));
  }

  sendEmailClient(invoice: InvoiceToolsDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/sample/email/attachment', invoice)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  // sendEmailClientDeviceSale(invoice: InvoiceToolsDto): Observable<any> {
  //   return this.http.post<any>(this.apiUrl + 'api/sample/email/device/shop', invoice)
  //     .pipe(
  //       catchError(this.errorHandler)
  //     );
  // }

  sendWhatsAppClient(invoice: InvoiceToolsDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'message/api/whatsapp', invoice)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  sendMmsClient(invoice: InvoiceToolsDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'message/api/mms', invoice)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  sendSimpleEmailClient(invoice: InvoiceToolsDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/sample/email/sender', invoice)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  logGetHtml(): Observable<string> {
    return this.http.get(this.apiUrl + 'admin/api/web/logs', {
      responseType: 'text'
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  list_preparing_device(): Observable<Array<Client>> {
    return this.http.get<Array<Client>>(this.apiUrl + 'admin/api/device/preparing').pipe(
      catchError(this.errorHandler)
    );
  }

  isAdmin(token: string): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'admin/api/' + 'check/role/user', token)
      .pipe(
        catchError(this.errorHandler));
  }

  isAdminByNickName(name: string): Observable<StaffUser> {
    const params = new HttpParams().set('name', name);
    return this.http.get<StaffUser>(this.apiUrl + 'admin/api/extracting/users', {params})
      .pipe(
        catchError(this.errorHandler));
  }

  extendDateRepair(repair: Repair): Observable<any> {
    return this.http.post<boolean>(this.apiUrl + 'admin/api/' + 'extend/date/repair', repair)
      .pipe(
        catchError(this.errorHandler));
  }

  getAllUser(): Observable<StaffUser []> {
    return this.http.get<StaffUser[]>(this.apiUrl + 'admin/api/extracting/all/users')
      .pipe(
        catchError(this.errorHandler));
  }

  disableUser(user: StaffUser): Observable<any> {
    return this.http.post<StaffUser>(this.apiUrl + 'admin/api/disable/user', user)
      .pipe(
        catchError(this.errorHandler));
  }

  activeUser(user: StaffUser): Observable<any> {
    return this.http.post<StaffUser>(this.apiUrl + 'admin/api/empower/user', user)
      .pipe(
        catchError(this.errorHandler));
  }

  intervalRepairMaidStatisticByModel(init: Date, finaly: Date): Observable<any> {
    const params = new HttpParams().set('initiate', init.toString()).set('finale', finaly.toString());
    return this.http.get<[]>(this.apiUrl + 'admin/api/interval/repair', {params})
      .pipe(
        catchError(this.errorHandler));
  }

  intervalShopModelMaidStatisticByModel(init: Date, finaly: Date): Observable<any> {
    const params = new HttpParams().set('initiate', init.toString()).set('finale', finaly.toString());
    return this.http.get<[]>(this.apiUrl + 'admin/api/interval/shop', {params})
      .pipe(
        catchError(this.errorHandler));
  }

  intervalShopMaidStatisticByModel(init: Date, finaly: Date): Observable<any> {
    const params = new HttpParams().set('initiate', init.toString()).set('finale', finaly.toString());
    return this.http.get<[]>(this.apiUrl + 'admin/api/statistic/shop/month/interval', {params})
      .pipe(
        catchError(this.errorHandler));
  }

  intervalRepairMaidStatisticByMonth(init: Date, finaly: Date): Observable<StatisticModel[]> {
    const params = new HttpParams().set('init', init.toString()).set('finale', finaly.toString());
    return this.http.get<StatisticModel[]>(this.apiUrl + 'admin/api/statistic/repair/month/interval', {params})
      .pipe(
        catchError(this.errorHandler));
  }

  intervalRepairModelAndPartsStatistic(init: Date, finaly: Date): Observable<StatisticModelParts[]> {
    const params = new HttpParams().set('init', init.toString()).set('finale', finaly.toString());
    return this.http.get<any>(this.apiUrl + 'admin/api/statistic/repair/model/parts/interval', {params})
      .pipe(
        catchError(this.errorHandler));
  }

  intervalUsersAmountStatistic(init: Date, finaly: Date): Observable<StatisticModelParts[]> {
    const params = new HttpParams().set('init', init.toString()).set('finale', finaly.toString());
    return this.http.get<any>(this.apiUrl + 'admin/api/statistic/user/repair/amount/interval', {params})
      .pipe(
        catchError(this.errorHandler));
  }

  intervalUsersAmountOpenRepairStatistic(init: Date, finaly: Date): Observable<StatisticModelParts[]> {
    const params = new HttpParams().set('init', init.toString()).set('finale', finaly.toString());
    return this.http.get<any>(this.apiUrl + 'admin/api/statistic/user/repair/open/amount/interval', {params})
      .pipe(
        catchError(this.errorHandler));
  }

  intervalUsersShopTradeAmountStatistic(init: Date, finaly: Date): Observable<StatisticModelParts[]> {
    const params = new HttpParams().set('init', init.toString()).set('finale', finaly.toString());
    return this.http.get<any>(this.apiUrl + 'admin/api/statistic/user/shop/trade/amount/interval', {params})
      .pipe(
        catchError(this.errorHandler));
  }

  intervalUsersBayingTradeAmountStatistic(init: Date, finaly: Date): Observable<StatisticModelParts[]> {
    const params = new HttpParams().set('init', init.toString()).set('finale', finaly.toString());
    return this.http.get<any>(this.apiUrl + 'admin/api/statistic/user/shop/bay/amount/interval', {params})
      .pipe(
        catchError(this.errorHandler));
  }

  retrySendInvoice(message: MessageInvoice) {
    return this.http.post(this.apiUrl + 'v1/send/invoice/retry', message)
      .pipe(
        catchError(this.errorHandler));
  }

  getAllRejectNotification(): Observable<MessageInvoice[]> {
    return this.http.get<MessageInvoice[]>(this.apiUrl + 'v1/all/invoice/reject')
      .pipe(
        catchError(this.errorHandler));
  }

  deleteRejectNotification(id: number): Observable<any> {
    return this.http.delete<any>(this.apiUrl + 'v1/delete/reject/invoice/' + id)
      .pipe(
        catchError(this.errorHandler));
  }

  deleteDiscardRepair(client: Client): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/discard/repair/', client)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  sendSmsNotification(invoiceToolsDto: InvoiceToolsDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'message/api/sms/', invoiceToolsDto)
      .pipe(
        catchError(this.errorHandler));
  }

  sendEmailNotification(invoiceToolsDto: InvoiceToolsDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'message/api/notification/end/repair', invoiceToolsDto)
      .pipe(
        catchError(this.errorHandler));
  }

  getListModelsDevice(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'api/utils/models')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getClientSingleRepair(id: number): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + 'api/search/single/repair/number',
      {
        params: new HttpParams().set('id', String(id))
      })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  addNewModelsToList(model: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/utils/save/models', model)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  savedEditClient(client: Client): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'api/redact/client', client)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getListPartsDevice(): Observable<string[]> {
    return this.http.get<string[]>(this.apiUrl + 'api/utils/parts')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  addNewPartsToList(part: string): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/utils/save/parts', part)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  addNewImagesToRepair(repair: Repair): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/repair/images/saved', repair)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  addNewInvoiceRepairsModel(invoiceModel: InvoiceRepairModel): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'admin/api/invoice/model/repair/saved', invoiceModel)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  addNewInvoiceShopsModel(invoiceModel: InvoiceShopModels): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'admin/api/invoice/model/shop/saved', invoiceModel)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  findInvoiceShopModelByOrder(orderInvoice: string): Observable<InvoiceShopModels> {
    return this.http.get<InvoiceShopModels>(this.apiUrl + 'admin/api/invoice/model/shop/order',
      {
        params: new HttpParams().set('order', orderInvoice)
      })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  findInvoiceModelByOrder(orderInvoice: string): Observable<InvoiceOrderModel> {
    return this.http.get<InvoiceOrderModel>(this.apiUrl + 'admin/api/invoice/model/order',
      {
        params: new HttpParams().set('order', orderInvoice)
      })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  findInvoiceRepairsModelByOrder(orderInvoice: string): Observable<InvoiceRepairModel> {
    return this.http.get<InvoiceRepairModel>(this.apiUrl + 'admin/api/invoice/model/repair/order',
      {
        params: new HttpParams().set('order', orderInvoice)
      })
      .pipe(
        catchError(this.errorHandler)
      );
  }

  getClientPageable(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/all/client/pageable-',
      {
        params: new HttpParams().set('page', String(page)).set('size', String(size))
      }).pipe(
      catchError(this.errorHandler)
    );
  }

  getPreorderPageable(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/order/open/pageable-',
      {
        params: new HttpParams().set('page', String(page)).set('size', String(size))
      }).pipe(
      catchError(this.errorHandler)
    );
  }

  getPreorderPageableAll(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/order/all/pageable-',
      {
        params: new HttpParams().set('page', String(page)).set('size', String(size))
      }).pipe(
      catchError(this.errorHandler)
    );
  }

  getPreorderDtoById(id: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/order/id',
      {
        params: new HttpParams().set('id', String(id))
      }).pipe(
      catchError(this.errorHandler)
    );
  }

  updateOrderStatusToOrdinate(id: number) {
    return this.http.post<any>(this.apiUrl + 'api/order/update/status/ordinate/id', {},
      {
        params: new HttpParams().set('id', String(id))
      }).pipe(
      catchError(this.errorHandler)
    );
  }

  getDeviceForSaleById(id: any): Observable<DeviceForSaleTransaction> {
    return this.http.get<DeviceForSaleTransaction>(this.apiUrl + 'api/device/single/id',
      {params: new HttpParams().set('id', String(id))}).pipe(
      catchError(this.errorHandler)
    );
  }

  getDeviceSalePageable(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/device/all/shop/pageable',
      {
        params: new HttpParams().set('page', String(page)).set('size', String(size))
      }).pipe(
      catchError(this.errorHandler)
    );
  }

  getDeviceSaleTransactionAllPageable(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/device/sale/all/pageable',
      {
        params: new HttpParams().set('page', String(page)).set('size', String(size))
      }).pipe(
      catchError(this.errorHandler)
    );
  }
  updateStatusSpareConfirmed(spare:SparePartsReturnDto) {
    return this.http.post<any>(this.apiUrl + 'api/spare/controlled', spare,
        ).pipe(
      catchError(this.errorHandler)
    );
  }
  updateStatusSpareSend(spare:SparePartsReturnDto) {
    return this.http.post<any>(this.apiUrl + 'api/spare/send', spare,
    ).pipe(
      catchError(this.errorHandler)
    );
  }
  getSpareAllPageable(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/spare/all/page',
      {
        params: new HttpParams().set('page', String(page)).set('size', String(size))
      }).pipe(
      catchError(this.errorHandler)
    );
  }
  getSpareOutDatePageable(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/spare/out/page',
      {
        params: new HttpParams().set('page', String(page)).set('size', String(size))
      }).pipe(
      catchError(this.errorHandler)
    );
  }
  getDeviceSaleTransactionIsSalePageable(page: number, size: number): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/device/sale/is/pageable',
      {
        params: new HttpParams().set('page', String(page)).set('size', String(size))
      }).pipe(
      catchError(this.errorHandler)
    );
  }

  getClientPageableByInterval(page: number, size: number, dateInit: Date, dateComplete: Date): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/date/client/pageable-',
      {
        params: new HttpParams()
          .set('page', String(page))
          .set('size', String(size))
          .set('dateinit', String(dateInit))
          .set('datecomplete', String(dateComplete))
      }).pipe(
      catchError(this.errorHandler)
    );
  }

  getMessagePageableByInterval(page: number, size: number, dateInit: Date, dateComplete: Date): Observable<any> {
    return this.http.get<any>(this.apiUrl + 'api/date/message/pageable-',
      {
        params: new HttpParams()
          .set('page', String(page))
          .set('size', String(size))
          .set('dateinit', String(dateInit))
          .set('datecomplete', String(dateComplete))
      }).pipe(
      catchError(this.errorHandler)
    );
  }

  getClientRepairByNameAndFamily(name: string, family: string) {
    return this.http.get<Client[]>(this.apiUrl + 'api/client/repair/name/', {
      params: new HttpParams()
        .set('name', name)
        .set('family', family)
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  getClientShopByNameAndFamily(name: string, family: string): Observable<DeviceForSaleTransaction[]> {
    return this.http.get<DeviceForSaleTransaction[]>(this.apiUrl + 'api/device/client/shop/name/', {
      params: new HttpParams()
        .set('name', name)
        .set('family', family)
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  getClientShopByOnlyFamily(family: string): Observable<DeviceForSaleTransaction[]> {
    return this.http.get<DeviceForSaleTransaction[]>(this.apiUrl + 'api/device/client/shop/only/family/', {
      params: new HttpParams()
        .set('family', family)
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  getClientShopByOnlyName(name: string): Observable<DeviceForSaleTransaction[]> {
    return this.http.get<DeviceForSaleTransaction[]>(this.apiUrl + 'api/device/client/shop/only/name/', {
      params: new HttpParams()
        .set('name', name)
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  putDeviceForSaleRedact(deviceForSaleTransaction: DeviceForSaleTransaction) {
    return this.http.post<DeviceForSaleTransaction>(this.apiUrl + 'api/device/transactional/redact', deviceForSaleTransaction
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  getClientRepairByName(name: string): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl + 'api/client/repair/only/name/', {
      params: new HttpParams()
        .set('name', name)
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  getClientRepairByFamily(family: string): Observable<Client[]> {
    return this.http.get<Client[]>(this.apiUrl + 'api/client/repair/only/family/', {
      params: new HttpParams()
        .set('family', family)
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  getDeviceForSaleByDeviceId(idDeviceSale: number): Observable<DeviceForSaleTransaction> {
    return this.http.get<DeviceForSaleTransaction>(this.apiUrl + 'api/device/single/by/device/id', {
      params: new HttpParams()
        .set('id', idDeviceSale.toString())
    }).pipe(
      catchError(this.errorHandler)
    );
  }

  getNickNameCurrentStaffUser(): Observable<UserStaffNickNamePojo> {
    return this.http.get<UserStaffNickNamePojo>(this.apiUrl + 'api/current/user/nickname')
      .pipe(
        catchError(this.errorHandler)
      );
  }

  redactStaffUser(staffUser: StaffUser): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'admin/api/redact/user', staffUser)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  sendRequestChangePassword(passwordRecoveryPojo: PasswordRecoveryPojo): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/recovery/password/request', passwordRecoveryPojo).pipe(
      catchError(this.errorHandler)
    );
  }

  sendRequestChangePasswordToSaved(passwordRecoveryPojo: PasswordRecoveryPojo): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/recovery/password/saved', passwordRecoveryPojo).pipe(
      catchError(this.errorHandler)
    );
  }

  errorHandler(error) {
    if (!navigator.onLine) {
      const error1 = new Error(error.error);
      error1.message = 'You lost your internet connection.';
      return throwError(error1);
    }
    if (error.error instanceof ErrorEvent) {
      const error1 = new ErrorEvent(error.error);
      error1.error.message = 'A client-side or network error occurred. Handle it accordingly.';
      error = error1;
      console.error('An error occurred:', error.error.message);
    }
    return throwError(error);
  }

}
