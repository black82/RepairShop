import {Component, OnInit} from '@angular/core';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';
import {HttpClien} from '../service/clientservice.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  logs_icon = faCogs;
  isAdmin = false;

  constructor(private httpService: HttpClien) {
  }

  ngOnInit(): void {
    this.checkAuth();
  }

  checkAuth() {
    const item = localStorage.getItem('token');
    if (item) {
      this.httpService.isAdmin(item).subscribe(value => {
        this.isAdmin = value;
      }, error => {
        console.log(error);
      });
    }
  }
}
