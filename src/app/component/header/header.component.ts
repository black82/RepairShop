import {Component, OnInit} from '@angular/core';
import {faHome} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  home = faHome;

  constructor() {
  }

  ngOnInit() {
  }

}
