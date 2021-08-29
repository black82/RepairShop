import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpXsrfTokenExtractor} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CSRFService} from './csrf.service';

@Injectable()
export class HttpXSRFInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor, private csrfService: CSRFService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let requestToForward = req;
    const token = this.csrfService.getCSRF();
    if (token !== null) {
      requestToForward = req.clone({setHeaders: {'X-XSRF-TOKEN': token}}).clone({withCredentials: true});
    }
    return next.handle(requestToForward);
  }
}
