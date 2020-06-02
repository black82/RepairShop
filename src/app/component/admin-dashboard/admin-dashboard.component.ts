import {Component, OnInit} from '@angular/core';
import {faCogs} from '@fortawesome/free-solid-svg-icons/faCogs';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {
  logs_icon = faCogs;

  constructor() {
  }

  ngOnInit(): void {
  }

}
