import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {HttpClien} from './clientservice.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(private authService: HttpClien, private router: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): boolean {
    if (this.authService.isLoggedIn) {
      return true;
    }

    this.authService.redirectUrl = url;
    this.router.navigate(['/login']).then(r => r.valueOf());
    return false;
  }
}
