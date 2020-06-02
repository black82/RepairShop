import {Component, OnDestroy, OnInit} from '@angular/core';
import {faHome} from '@fortawesome/free-solid-svg-icons';
import {HttpClien} from '../service/clientservice.service';
import {AdminServiceService} from '../service/admin-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  home = faHome;
  admin = false;

  constructor(private http: HttpClien,
              private adminService: AdminServiceService) {
  }

  ngOnInit() {
    const item = localStorage.getItem('roles');
    if (item && item.length === 5) {
      this.admin = true;
    }
    this.adminService.$admin_show.subscribe(() => {
      this.showAdminPage();
    });
  }

  logout() {
    this.admin = false;
    this.http.logout();
  }

  showAdminPage() {
    this.admin = true;
  }

  ngOnDestroy(): void {
    this.adminService.$admin_show.unsubscribe();
  }
}
