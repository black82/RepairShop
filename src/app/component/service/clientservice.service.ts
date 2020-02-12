import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {Client} from '../entity/ClientWeb';

@Injectable({
  providedIn: 'root'
})
export class ClientserviceService {
  isLoggedIn = false;
  redirectUrl: string;

  apiUrl = 'http://localhost:8080/';
  router: Router;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  httpOptionsHtml = {
    headers: new HttpHeaders({
      Accept: 'text/html'
    })
  };

  constructor(private http: HttpClient) {

  }

  searchClientById(param): Observable<Client> {
    return this.http.get<Client>(this.apiUrl + 'api/search/id' + param, this.httpOptions)
      .pipe(
        retry(2),
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

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error); // log to console instead
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
