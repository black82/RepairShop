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
    if (localStorage.getItem('islogin') === '1') {
      return true;
    } else {
      localStorage.setItem('navigate', url);
      this.router.navigate(['client/sign-in']);
      return false;

    }

  }
}
