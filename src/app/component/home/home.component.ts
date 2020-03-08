import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search = faSearch;
  return = faSignOutAlt;
  entering = faSignInAlt;
  hidem_animation = true;

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => this.hidem_animation = false, 3000);
  }

}
