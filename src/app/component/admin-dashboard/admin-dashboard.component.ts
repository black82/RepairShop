import {Component, OnInit} from '@angular/core';
import {HttpClien} from '../service/clientservice.service';
import {faCalendarPlus} from '@fortawesome/free-solid-svg-icons/faCalendarPlus';
import {faLaptopCode} from '@fortawesome/free-solid-svg-icons/faLaptopCode';
import {faChartLine} from '@fortawesome/free-solid-svg-icons/faChartLine';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons/faUserEdit';
import {faFileMedicalAlt} from '@fortawesome/free-solid-svg-icons/faFileMedicalAlt';
import {faEnvelopeOpen} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  isAdmin = false;
  calendar = faCalendarPlus;
  device = faLaptopCode;
  charts = faChartLine;
  users = faUserEdit;
  logs = faFileMedicalAlt;
  mail = faEnvelopeOpen;

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
