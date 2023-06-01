import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {faMobile} from '@fortawesome/free-solid-svg-icons/faMobile';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {HttpClien} from '../service/clientservice.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {AlertServiceService} from '../service/alert-service.service';
import {DeviceInputService} from '../service/device-input.service';
import {ClientStaticServiceService} from '../service/client-static-service.service';
import {Observable} from 'rxjs';
import {SparePartsReturnDto} from '../entity/SparePartsReturnDto';
import {faChartBar} from '@fortawesome/free-solid-svg-icons/faChartBar';
import {faEye} from '@fortawesome/free-solid-svg-icons/faEye';
import {MatSort, Sort} from '@angular/material/sort';
import {faBars} from "@fortawesome/free-solid-svg-icons/faBars";
import {faDiagramNext} from "@fortawesome/free-solid-svg-icons";
import {faHistory} from "@fortawesome/free-solid-svg-icons/faHistory";
import {faPenToSquare} from "@fortawesome/free-solid-svg-icons/faPenToSquare";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-spare-pagiantor',
  templateUrl: './spare-pagination.component.html',
  styleUrls: ['./spare-pagination.component.css']
})
export class SparePaginationComponent implements OnInit {
  @Input()
  typeDate: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input()
  paginatorViu = false;
  sparePartsReturn: SparePartsReturnDto[];
  pageIndex: number;
  pageSize: number;
  length: number;
  deviceIcon = faMobile;
  pageEvent: PageEvent;
  sally_button = faEye;
  status = faDiagramNext;
  menus = faBars;
  showClient = false;
  spare: SparePartsReturnDto;
  hide_button = faHistory;
  protected readonly faHistory = faHistory;
  showRedactClient = false;
  editIcon = faPenToSquare;

  constructor(private clientHttp: HttpClien,
              private animation_wait: AnimeServiceService,
              private alert_service: AlertServiceService,
              public dialog: MatDialog, public cl: ClientStaticServiceService) {
  }

  ngOnInit(): void {
    this.getServerData(undefined);

  }

  public getServerData(event?: PageEvent) {
    if (event === undefined) {
      event = new PageEvent();
      event.pageSize = 10;
      event.pageIndex = 0;
    }
    this.animation_wait.$anime_show.emit(true);
    this.checkTypeDateToServer(event.pageIndex, event.pageSize).subscribe(
      response => {
        this.animation_wait.$anime_show.emit(false);
        this.sparePartsReturn = response.content;
        this.pageIndex = response.pageable.pageNumber;
        this.pageSize = response.pageable.pageSize;
        this.length = response.totalElements;
        this.paginatorViu = true;
      },
      () => {
        this.animation_wait.$anime_show.emit(false);
        this.paginatorViu = false;
      }
    );
    this.paginatorViu = true;
    return event;
  }

  showDevice(element: SparePartsReturnDto) {
    console.log(element)
    this.spare = element;
    console.log(this.spare)
    this.showClient = true;


  }

  statusToConfirmed(element: SparePartsReturnDto) {
    this.clientHttp.updateStatusSpareConfirmed(element).subscribe(p => {
      if (p) {
        element.status = 'CONTROLLED';
      }
    });
  }

  changeStatus(element: SparePartsReturnDto) {
    if (confirm(`Are you sure you want to change the Status?`)) {
      this.animation_wait.$anime_show.emit(true);
      if (element.status === 'RECEIVED') {
        this.statusToConfirmed(element);
      } else if (element.status === 'CONTROLLED') {
        this.changeStatusToSend(element);
      }
      this.animation_wait.$anime_show.emit(false);
    }

  }

  hideClient() {
    this.showClient = false;
  }

  checkTypeDateToServer(pageIndex: number, pageSize: number): Observable<any> {
    switch (this.typeDate) {
      case 'all': {
        return this.clientHttp.getSpareAllPageable(pageIndex, pageSize);
      }
      case 'outDate': {
        return this.clientHttp.getSpareOutDatePageable(pageIndex, pageSize);
      }
    }
  }

  getColorByStatus(element: string) {
    if (element === 'RECEIVED') {
      return 'background: #C64800;color:white;  border-radius: 5px;';
    } else if (element === 'CONTROLLED') {
      return 'background: #ffd633 ;color:white;  border-radius: 5px;';
    } else if (element === 'SEND') {
      return 'background: #34495E;color:white;  border-radius: 5px;';
    }
  }

  sortData(sort: Sort) {
    const data = this.sparePartsReturn.slice();
    if (!sort.active || sort.direction === '') {
      this.sparePartsReturn = data;
      return;
    }

    this.sparePartsReturn = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'id':
          return this.compare(a.id, b.id, isAsc);
        case 'client':
          return this.compare(a.client, b.client, isAsc);
        case 'technicReceived':
          return this.compare(a.technicReceived, b.technicReceived, isAsc);
        case 'reason':
          return this.compare(a.reason, b.reason, isAsc);
        case 'defect':
          return this.compare(a.difect, b.difect, isAsc);
        case 'model':
          return this.compare(a.model, b.model, isAsc);
        case 'status':
          return this.compare(a.status, b.status, isAsc);
        case 'date':
          return this.compareData(a.dateReceived, b.dateReceived, isAsc);
        default:
          return 0;
      }
    });
  }

  compare(a: number | string, b: number | string, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  compareData(a: Date, b: Date, isAsc: boolean) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }

  private changeStatusToSend(element: SparePartsReturnDto) {
    this.clientHttp.updateStatusSpareSend(element).subscribe(p => {
      if (p) {
        element.status = 'SEND';
      }
    });
  }


  hideClientRedact() {
    this.showRedactClient = !this.showRedactClient;
  }

  editSpare(element: SparePartsReturnDto) {
    this.spare = element;
    this.showClient = false;
    this.showRedactClient = true;
  }
}

