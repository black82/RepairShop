import {Component, OnInit} from '@angular/core';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {faLockOpen} from '@fortawesome/free-solid-svg-icons/faLockOpen';
import {HttpClien} from '../service/clientservice.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  home = faHome;
  lock = faLockOpen;

  constructor(private http: HttpClien) {
  }

  ngOnInit() {
  }

  logout() {
    this.http.logout();
  }
}
