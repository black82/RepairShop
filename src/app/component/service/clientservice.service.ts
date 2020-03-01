import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Client} from '../entity/ClientWeb';
import {Repair} from '../entity/Repair';

@Injectable({
  providedIn: 'root'
})
export class HttpClien {


  apiUrl = 'http://localhost:8080/';


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  httpOptionsHtml = {
    headers: new HttpHeaders({
      Accept: 'text/html'
    })
  };

  constructor(private http: HttpClient, private router: Router) {

  }

  createClient(client: Client): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'api/create/client', client, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  searchByTelephoneNumber(telephone: string): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + '/api/search/number', {
      params: new HttpParams().set('telephone', telephone), headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    })
      .pipe(retry(2),
        catchError(this.errorHandler)
      );
  }

  outputDeviceForm(repair: Repair, id: number): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + '/api/create/client/return/device/' + id, repair, this.httpOptions)
      .pipe(retry(2),
        catchError(this.errorHandler)
      );

  }

  searchClientById(param): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + 'api/search/id' + param, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
  }

  errorHandler(error: HttpErrorResponse) {
    if (!navigator.onLine) {
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

}
