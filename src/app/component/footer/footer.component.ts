import {Component, OnInit} from '@angular/core';

export declare function animeFooter(): void;
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {


  constructor() { }

  ngOnInit() {
    animeFooter();
  }

}
