import {Component, OnInit} from '@angular/core';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  mobile = faMobile;
  search = faSearch;
  return = faSignOutAlt;
  entering = faSignInAlt;

  constructor() {
  }

  ngOnInit() {
  }

}
