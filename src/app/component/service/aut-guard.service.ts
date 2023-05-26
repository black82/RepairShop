import {Injectable} from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import {HttpClien} from './clientservice.service';


@Injectable({
  providedIn: 'root'
})
export class AutGuardService  {
  isAuthenticate = false;

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
      this.isAuthenticate = true;
      return true;
    } else {
      this.isAuthenticate = false;
      this.authService.logout();
      localStorage.setItem('navigate', url);
      this.router.navigate(['client/sign-in']).then(r => r);
      return false;
    }

  }
}
