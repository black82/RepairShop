import {Injectable} from '@angular/core';
import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {Router} from '@angular/router';
import {AlertServiceService} from './alert-service.service';
import {HttpClien} from './clientservice.service';
import {AnimeServiceService} from './anime-service.service';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  currentRoute: string;

  constructor(private router: Router,
              private alertService: AlertServiceService,
              private httpClient: HttpClien,
              private animeService: AnimeServiceService) {
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
    request = request.clone({
      withCredentials: true
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          this.currentRoute = null;
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        let message = error?.error?.rootCause?.message;
        this.animeService.$anime_show.emit(false);
        if (error?.message) {
          if (error?.error?.message?.includes('Expired or invalid JWT token') || error?.status === 401) {
            // error.error.status = 401;
            localStorage.clear();
            localStorage.setItem('navigate', this.router.url);
            this.router.navigate(['client/sign-in']);
            this?.alertService.info(null, 'Your session has come to an end please login', false, false, '', error);
            return throwError(error);
          } else if (error.status === 403) {
            localStorage.clear();
            localStorage.setItem('navigate', this.router.url);
            this.router.navigate(['client/sign-in']);
            this?.alertService.info(null, error.message, false, false, '', error);

          }
        }
        if (!message) {
          if (error?.status === 404 && error?.message?.includes('api')) {
            message = 'Unfortunately, nothing could be found. Check the data entered.';
          } else {
            message = error?.message;
          }
        }
        if (error?.error?.message) {
          message = error.error.message;
        }

        if (error.status >= 500) {
          this?.alertService.error(null, message, false, false, '', error);
        } else if (error.status === 0) {
          this?.alertService.error(null, 'Something arrogant happened to try again! Sorry', false, false, '', error);
          localStorage.clear();
          localStorage.setItem('navigate', this.router.url);
          this.router.navigate(['client/sign-in']);
        } else if (error.status) {
          this?.alertService.error(null, message, false, false, '', error);
        }
        return throwError(error);
      }));
  }
}
