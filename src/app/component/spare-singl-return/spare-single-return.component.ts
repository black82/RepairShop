import {Component, Input, OnInit} from '@angular/core';

import {faUserTag} from "@fortawesome/free-solid-svg-icons";

import {faHistory} from "@fortawesome/free-solid-svg-icons/faHistory";

import {faCog} from "@fortawesome/free-solid-svg-icons/faCog";
import {faEdge} from "@fortawesome/free-brands-svg-icons/faEdge";
import {HttpClien} from "../service/clientservice.service";
import {SparePartsReturnDto} from "../entity/SparePartsReturnDto";
import {faBomb} from "@fortawesome/free-solid-svg-icons/faBomb";
import {faMobile} from "@fortawesome/free-solid-svg-icons/faMobile";
import {faQuestion} from "@fortawesome/free-solid-svg-icons/faQuestion";
import {faColonSign} from "@fortawesome/free-solid-svg-icons/faColonSign";
import {faCalendar} from "@fortawesome/free-solid-svg-icons/faCalendar";
import {faCalendarPlus} from "@fortawesome/free-solid-svg-icons/faCalendarPlus";
import {faCalendarCheck} from "@fortawesome/free-solid-svg-icons/faCalendarCheck";
import {faUserAstronaut} from "@fortawesome/free-solid-svg-icons/faUserAstronaut";
import {AnimeServiceService} from "../service/anime-service.service";
import {faMicroscope} from "@fortawesome/free-solid-svg-icons/faMicroscope";

@Component({
  selector: 'app-spare-single-return',
  templateUrl: './spare-single-return.component.html',
  styleUrls: ['./spare-single-return.component.css']
})
export class SpareSingleReturnComponent implements OnInit {
  @Input()
  spareReturn: SparePartsReturnDto;

  editTransaction = false;
  hide_button = faCog;
  showDevice = false;
  code = faEdge;

  usertag = faUserTag;
  difect = faBomb;
  statuse = faHistory;
  model = faMobile;
  reason = faQuestion;
  color = faColonSign;
  userRec = faUserTag;
  date = faCalendar;
  dateControl = faCalendarPlus;
  dateSent = faCalendarCheck;
  supplier = faUserAstronaut;
  testIcon=faMicroscope
  images: string [];

  constructor(private httpClient: HttpClien,private animeService:AnimeServiceService) {

  }

  ngOnInit(): void {
    this.animeService.$anime_show.emit(true);
    this.httpClient.getSpareById(this.spareReturn.id).subscribe(p => {
      this.spareReturn = p;
      this.images =this.spareReturn.filesSpareReturn
      this.showDevice = true;
      this.animeService.$anime_show.emit(false);
    })
  }

  dismissedRedact() {

  }

  editTransactionDevice() {

  }

}
