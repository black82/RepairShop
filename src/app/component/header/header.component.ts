import {Component, OnDestroy, OnInit} from '@angular/core';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {HttpClien} from '../service/clientservice.service';
import {AdminServiceService} from '../service/admin-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  home = faHome;
  admin = false;
  private subscribe_admin: Subscription;


  constructor(private http: HttpClien,
              private adminService: AdminServiceService) {
  }

  ngOnInit() {
    const view = localStorage.getItem('roles');
    if (view) {
      this.admin = true;
    }
    this.subscribe_admin = this.adminService.$admin_show.subscribe(value => {
      this.showAdminPage(value);
    });
  }

  logout() {
    this.http.logout();
  }

  showAdminPage(value) {
    this.admin = value;
  }

  ngOnDestroy(): void {
    if (this.subscribe_admin) {
      this.subscribe_admin.unsubscribe();
    }
  }
}
