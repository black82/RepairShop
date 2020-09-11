import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertServiceService} from './alert-service.service';
import {HttpClien} from './clientservice.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  currentRoute: string;

  constructor(private router: Router, private alertService: AlertServiceService, private httpClient: HttpClien) {
    this.currentRoute = this.router.url;

  }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    if (token) {
      request = request.clone({
          headers: request.headers.append('Authorization', 'Bearer ' + token)
        }
      );
    }
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
          headers: request.headers.append('Content-Type', 'application/json'),
        }
      );
    }
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.currentRoute = null;
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let message = error?.error?.rootCause?.message;
        if (error?.message) {
          if (error?.message.includes('Expired or invalid JWT token')) {
            error.error.status = 401;
            this.httpClient.logout();
            localStorage.setItem('navigate', this.router.url);
            this.router.navigate(['client/sign-in']).then(r => r);
            return;
          }

          if (error?.status === 401) {
            this.httpClient.logout();
            localStorage.setItem('navigate', this.router.url);
            this.router.navigate(['client/sign-in']).then(r => r);
            return;
          }
        }
        if (!message) {
          if (error?.status === 404 && error?.message.includes('api')) {
            message = 'Unfortunately, nothing could be found. Check the data entered.';
          } else {
            message = error?.message;
          }
        }
        if (error?.error?.payload?.localizedMessage) {
          message = error.error.payload.localizedMessage;
        }
        if (error?.error?.message) {
          message = error.error.message;
        }
        console.log('error--->>>', error);
        this?.alertService.error(null, message, false, false, '', error);
        return throwError(error);
      }));
  }
}
