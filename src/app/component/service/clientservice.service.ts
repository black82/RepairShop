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

@Injectable({
  providedIn: 'root'
})
export class HttpClien {
  // redirectUrl: string;
  apiUrl = 'http://ec2-15-161-2-246.eu-south-1.compute.amazonaws.com/';

  // apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient,
              private adminService: AdminServiceService) {
  }

  printClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + 'api/print/client', client)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  saved_print_page(invoiceToolsDto: InvoiceToolsDto): Observable<URL> {
    return this.http.post<URL>(this.apiUrl + 'admin/api/saved/print/page', invoiceToolsDto)
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
    this.adminService.$admin_show.emit(false);
    localStorage.clear();
  }

  register(data: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + 'api/auth/' + 'register', data)
      .pipe(
        catchError(this.errorHandler));
  }

  sendEmailClient(invoice: InvoiceToolsDto): Observable<URL> {
    return this.http.post<URL>(this.apiUrl + 'admin/api/sample/email/attachment', invoice)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  sendSimpleEmailClient(invoice: InvoiceToolsDto): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'admin/api/sample/email/sender', invoice)
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
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(error?.name +
        `Backend returned code ${error?.status}, ` +
        `body was: ${error?.message}`);
    }
    return throwError(error);
  }


}
