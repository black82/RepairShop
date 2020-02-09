import {Component, Input, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';

@Component({
  selector: 'app-searchform',
  templateUrl: './searchform.component.html',
  styleUrls: ['./searchform.component.css']
})
export class SearchformComponent implements OnInit {
  search = faSearch;
  @Input()
  textButton: string;
  @Input()
  nameForm: string;

  constructor() {
  }

  ngOnInit() {
  }

  submit() {

  }
}
