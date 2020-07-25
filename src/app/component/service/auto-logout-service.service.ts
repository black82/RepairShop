import {Injectable} from '@angular/core';
import {HttpClien} from './clientservice.service';
import {AlertServiceService} from './alert-service.service';


@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {
  MINUTES_UNITL_AUTO_LOGOUT = 5;
  CHECK_INTERVAL = 15000;
  STORE_KEY = 'lastAction';

  constructor(private http: HttpClien,
              private allServices: AlertServiceService) {

  }

  startListenerActivity() {
    this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(this.STORE_KEY, Date.now().toString());
  }

  public getLastAction() {
    return Number(localStorage.getItem(this.STORE_KEY));
  }

  public setLastAction(lastAction: number) {
    localStorage.setItem(this.STORE_KEY, lastAction.toString());
  }

  initListener() {
    document.body.addEventListener('click', () => this.reset());
    document.body.addEventListener('mouseover', () => this.reset());
    document.body.addEventListener('mouseout', () => this.reset());
    document.body.addEventListener('keydown', () => this.reset());
    document.body.addEventListener('keyup', () => this.reset());
    document.body.addEventListener('keypress', () => this.reset());
  }

  removeListener() {
    document.body.removeEventListener('click', null);
    document.body.removeEventListener('mouseover', null);
    document.body.removeEventListener('mouseout', null);
    document.body.removeEventListener('keydown', null);
    document.body.removeEventListener('keyup', null);
    document.body.removeEventListener('keypress', null);
  }

  reset() {
    if (this.getLastAction()) {
      this.setLastAction(Date.now());
    }
  }

  initInterval() {
    const interval = setInterval(() => {
      this.check();
      if (!this.getLastAction()) {
        clearInterval(interval);
      }
    }, this.CHECK_INTERVAL);
  }

  check() {
    const now = Date.now();
    if (this.getLastAction()) {
      const timeleft = this.getLastAction() + this.MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
      const diff = timeleft - now;
      const isTimeout = diff < 0;

      if (isTimeout) {
        this.removeListener();
        this.http.logout();
        this.allServices.info(null, 'Due to inactivity in the last 5 minutes you have been disconnected',
          true, false, 'client/sign-in', null);
      }
    }
  }
}
