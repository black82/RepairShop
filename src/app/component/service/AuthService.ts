import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClien} from './clientservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: HttpClien, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state1: RouterStateSnapshot): boolean {
    const url: string = state1.url;

    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      console.log('state');
      return true;
    }

    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate(['client/sign-in']);
    return false;
  }
}
