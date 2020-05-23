import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClien} from './clientservice.service';


@Injectable({
  providedIn: 'root'
})
export class AutGuardService implements CanActivate {

  constructor(private authService: HttpClien, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): any {
    const expires_date = new Date(localStorage.getItem('is_login'));
    if (expires_date > new Date()) {
      return true;
    } else {
      localStorage.removeItem('token');
      localStorage.removeItem('is_login');
      localStorage.setItem('navigate', url);
      this.router.navigate(['client/sign-in']);
      return false;

    }

  }
}
