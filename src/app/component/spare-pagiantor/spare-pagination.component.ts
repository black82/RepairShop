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
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-spare-pagiantor',
  templateUrl: './spare-pagination.component.html',
  styleUrls: ['./spare-pagination.component.css']
})
export class SparePaginationComponent implements OnInit {
  displayedColumns = ['id', 'client', 'difect', 'color'];
  dataSource: MatTableDataSource<SparePartsReturnDto>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @Input()
  typeDate: string;
  paginatorViu = false;
  sparePartsReturn: SparePartsReturnDto[];
  pageIndex: number;
  pageSize: number;
  length: number;
  deviceIcon = faMobile;
  pageEvent: PageEvent;
  sally_button = faEye;
  status = faChartBar;
  showClient = false;

  constructor(private clientHttp: HttpClien,
              private animation_wait: AnimeServiceService,
              private alert_service: AlertServiceService,
              private deviceService: DeviceInputService, public cl: ClientStaticServiceService) {
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {
    this.getServerData(undefined);

    this.dataSource = new MatTableDataSource([]);
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
        this.dataSource = new MatTableDataSource(response.content);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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
    this.showClient = true;
    setTimeout(() => {
      // this.deviceService.$deviceForSaleClientTransaction.emit(element);
    }, 200);

  }

  hideClient() {
    this.showClient = false;
  }

  checkTypeDateToServer(pageIndex: number, pageSize: number): Observable<any> {
    switch (this.typeDate) {
      case 'all': {
        return this.clientHttp.getSpareAllPageable(pageIndex, pageSize);
      }
      case 'isSale': {
        return this.clientHttp.getDeviceSaleTransactionIsSalePageable(pageIndex, pageSize);
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
}
