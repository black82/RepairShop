import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams} from '@angular/common/http';
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
  isLoggedIn = false;
  apiUrl = 'http://localhost:8080/';
  htt;


  httpOptionsHtml = {
    headers: new HttpHeaders({
      Accept: 'text/html'
    })
  };

  constructor(private http: HttpClient, private router: Router) {

  }

  createClient(client: Client): Observable<boolean> {
    return this.http.post<boolean>(this.apiUrl + 'api/create/client', client)
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
        tap(_ => this.isLoggedIn = true),
        catchError(
          this.errorHandler)
      );
  }

  logout(): void {
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

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //     console.error(error);
  //     this.log(`${operation} failed: ${error.message}`);
  //     return of(result as T);
  //   };
  // }

  private log(message: string) {
    console.log(message);
  }
}
