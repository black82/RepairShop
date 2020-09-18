import {Component, OnInit} from '@angular/core';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {PageEvent} from '@angular/material/paginator';
import {HttpClien} from '../service/clientservice.service';
import {Client} from '../entity/ClientWeb';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import {faHistory} from '@fortawesome/free-solid-svg-icons/faHistory';
import {faToolbox} from '@fortawesome/free-solid-svg-icons/faToolbox';

@Component({
  selector: 'app-paginator-all-repair',
  templateUrl: './paginator-all-repair.component.html',
  styleUrls: ['./paginator-all-repair.component.css']
})
export class PaginatorAllRepairComponent implements OnInit {
  repair_icon = faTools;
  pageEvent: PageEvent;
  datasource: Client[];
  pageIndex: number;
  pageSize: number;
  length: number;
  client_shouw: Client;
  shouwClient = false;
  shows_button = faAngleDoubleRight;
  hide_button = faHistory;
  tools = faToolbox;
  paginator = false;

  constructor(private http: HttpClien) {
  }

  ngOnInit(): void {
  }


  public getServerData(event?: PageEvent) {
    if (event === undefined) {
      event = new PageEvent();
      event.pageSize = 10;
      event.pageIndex = 0;
    }
    this.http.getClientPageable(event.pageIndex, event.pageSize).subscribe(
      response => {

        this.datasource = response.content;
        this.pageIndex = response.pageable.pageNumber;
        this.pageSize = response.pageable.pageSize;
        this.length = response.totalElements;

      },
      error => {
        // handle error
      }
    );
    this.paginator = true;
    return event;
  }

  shows(element: Client) {
    const timeout = setTimeout(() => {
      this.shouwClient = true;
      this.client_shouw = element;
      clearTimeout(timeout);
    }, 300);

  }

  hideClient() {
    const elementById = document.getElementById('container-body');
    if (elementById) {
      elementById.classList.add('close-modal');
    }
    const timeout = setTimeout(() => {
      this.shouwClient = false;
      this.client_shouw = null;
      clearTimeout(timeout);
    }, 1000);
  }
}
