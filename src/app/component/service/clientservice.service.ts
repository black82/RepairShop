import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {Client} from '../entity/ClientWeb';
import {Repair} from '../entity/Repair';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpClien {
  redirectUrl: string;
  apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient, private router: Router) {
  }

  createClient(client: Client): Observable<boolean> {
    console.log(client);
    return this.http.post<boolean>(this.apiUrl + 'api/create/client', client)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  printClient(client: Client): Observable<Client> {
    return this.http.post<Client>(this.apiUrl + 'api/print/client', client)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  searchByTelephoneNumber(telephone: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + 'api/search/number', {
      params: new HttpParams().set('telephone', telephone)
    })
      .pipe(retry(2),
        catchError(err => {
          return this.errorHandler(err);
        })
      );
  }

  searchByRepairId(repairId: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + 'api/search/number', {
      params: new HttpParams().set('repair', repairId)
    })
      .pipe(retry(2),
        catchError(err => {
          return this.errorHandler(err);
        })
      );
  }

  outputDeviceForm(repair: Repair, id: number): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'api/create/client/return/device/' + id, repair)
      .pipe(retry(2),
        catchError(this.errorHandler)
      );

  }

  searchClientById(param): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + 'api/search/id' + param)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  login(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'api/auth/' + 'login', data)
      .pipe(
        tap(() => {
          console.log('login success');
          localStorage.setItem('islogin', '1');
        }),
        catchError(this.errorHandler)
      );
  }
  logout(): void {
    this.log('logout success');
    localStorage.setItem('islogin', '0');
    return localStorage.removeItem('token');
  }

  register(data: any): Observable<string> {
    return this.http.post<any>(this.apiUrl + 'api/auth/' + 'register', data)
      .pipe(
        tap(_ => this.log('register')),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    if (!navigator.onLine) {
      error = error as HttpErrorResponse;
      return throwError(new Error(error.error));
    }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(error.name +
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }

    return throwError(error);
  }

  private log(message: string) {
    console.log(message);
  }
}
