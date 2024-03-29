import {Component, OnInit} from '@angular/core';
import {PageEvent} from '@angular/material/paginator';
import {HttpClien} from '../service/clientservice.service';
import {Client} from '../entity/ClientWeb';
import {faAngleDoubleRight} from '@fortawesome/free-solid-svg-icons/faAngleDoubleRight';
import {faHistory} from '@fortawesome/free-solid-svg-icons/faHistory';
import {faToolbox} from '@fortawesome/free-solid-svg-icons/faToolbox';
import {ClientStaticServiceService} from '../service/client-static-service.service';

@Component({
  selector: 'app-paginator-all-repair',
  templateUrl: './paginator-all-repair.component.html',
  styleUrls: ['./paginator-all-repair.component.css']
})
export class PaginatorAllRepairComponent implements OnInit {
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

  constructor(private http: HttpClien, public cl: ClientStaticServiceService) {
  }

  ngOnInit(): void {
    this.getServerData();
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
