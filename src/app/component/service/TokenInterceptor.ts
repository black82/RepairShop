import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {HttpClien} from './clientservice.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  currentRoute: string;

  constructor(private router: Router, private httpClient: HttpClien) {
    this.currentRoute = this.router.url;

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-type': 'application/json'
        }
      });
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.currentRoute = null;
          console.log('event--->>>', event);
          localStorage.setItem('islogin', '1');
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        console.log('error--->>>', error);
        if (error.error.toString().includes('Expired or invalid JWT token')) {
          error.error.status = 401;
          localStorage.setItem('islogin', '0');
          localStorage.removeItem('token');
          localStorage.setItem('navigate', this.currentRoute);
          this.router.navigate(['client/sign-in']).then(r => console.log('navigate to sign-in' + r));
        }
        if (error.error.status === 401) {
          localStorage.setItem('islogin', '0');
          localStorage.setItem('navigate', this.currentRoute);
          this.router.navigate(['client/sign-in']).then(r => console.log('navigate to sign-in' + r));
        }
        return throwError(error);
      }));
  }
}
