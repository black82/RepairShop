import {Component, OnInit} from '@angular/core';
import {faEbay} from '@fortawesome/free-brands-svg-icons/faEbay';
import {faAmazon} from '@fortawesome/free-brands-svg-icons/faAmazon';
import {faGoogle} from '@fortawesome/free-brands-svg-icons/faGoogle';
import {faFacebook} from '@fortawesome/free-brands-svg-icons/faFacebook';
import {faInstagram} from '@fortawesome/free-brands-svg-icons/faInstagram';
import {AnimeServiceService} from "../service/anime-service.service";
import {AnimeJsProvider} from "../service/anime-js-provider.service";




@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  amazon = faAmazon;
  ebay = faEbay;
  google = faGoogle;
  facebook = faFacebook;
  instagram = faInstagram;


  constructor() {
  }

  ngOnInit() {
    AnimeJsProvider.animeFooter();
  }

}
