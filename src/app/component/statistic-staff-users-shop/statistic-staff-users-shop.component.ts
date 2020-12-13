import {Component, OnDestroy, OnInit} from '@angular/core';
import {faRemoveFormat} from '@fortawesome/free-solid-svg-icons/faRemoveFormat';
import {StatisticModelParts} from '../entity/StatisticModelParts';
import {Subscription} from 'rxjs';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {FormBuilder} from '@angular/forms';
import {StatisticRepairIntervalService} from '../service/statistic-repair-interval.service';
import {ColorsStringArray} from '../entity/ColorsStringArray';

@Component({
  selector: 'app-statistic-staff-users-shop',
  templateUrl: './statistic-staff-users-shop.component.html',
  styleUrls: ['./statistic-staff-users-shop.component.css']
})
export class StatisticStaffUsersShopComponent implements OnInit, OnDestroy {
  data_object: any;
  show_data = false;
  reject = faRemoveFormat;
  init_data: Date;
  complete_date: Date;
  date_server: StatisticModelParts[];
  colors: string[];
  labels: string[] = [];
  datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[] = [];
  data: number[] = [];
  backgroundColor: string[] = [];
  hoverBackgroundColor: string[] = [];
  isAdmin: boolean;
  options = {
    legend: {
      display: true,
      labels: {
        usePointStyle: true,
        beginAtZero: true,
        fontColor: '#fff',
        fontFamily: 'Dancing Script',
        serif: true
      }, title: {
        display: true,
        fontColor: '#fff', // can Add title color also
        text: 'Custom Chart Title'
      }
    }
  };
  typeChartTitle: string;
  private subscribe: Subscription;
  private amount: number;
  private subscriptionAmount: Subscription;
  private typeChart: string;

  constructor(private httpService: HttpClien,
              private alertService: AlertServiceService,
              private animation_wait: AnimeServiceService,
              private formBuilder: FormBuilder,
              private service_show_statistic: StatisticRepairIntervalService) {
    this.colors = new ColorsStringArray().getColors();
  }

  ngOnInit(): void {
    this.checkAuth();
    if (this.isAdmin) {
      return;
    }
    this.subscribe = this.service_show_statistic.$users_amount_shop_statistic.subscribe(request => {
      if (request) {
        this.colors = new ColorsStringArray().getColors();
        this.init_data = request.data_init_interval;
        this.complete_date = request.data_complete_interval;
        if (request.type === 'close') {
          this.typeChart = 'sell';
          this.typeChartTitle = 'Chart By Users Amount Sell Shop';
          this.getDateBackendClose();
        } else {
          this.typeChart = 'baying';
          this.typeChartTitle = 'Chart By Users Amount Baying Shop';
          this.getDateBackendBay();
        }
      }
    });
    this.subscriptionAmount = this.service_show_statistic.statistic_amount.subscribe(amount => {
      this.amount = amount;
    });
  }

  checkAuth() {
    const item = localStorage.getItem('token');
    if (item) {
      this.httpService.isAdmin(item).subscribe(value => {
        this.isAdmin = value;
      }, error => {
        console.log(error);
      });
    }
  }

  hidden_container() {
    this.show_data = false;
  }

  getDateBackendClose() {
    this.deleteOldDate();
    this.animation_wait.$anime_show.emit(true);
    this.httpService.intervalUsersShopTradeAmountStatistic(this.init_data, this.complete_date).subscribe(value => {
      this.date_server = value;
      this.elaboration_server_data();
    }, () => {
      this.animation_wait.$anime_show.emit(false);
    });
  }

  getDateBackendBay() {
    this.deleteOldDate();
    this.animation_wait.$anime_show.emit(true);
    this.httpService.intervalUsersBayingTradeAmountStatistic(this.init_data, this.complete_date).subscribe(value => {
      this.date_server = value;
      this.elaboration_server_data();
    }, () => {
      this.animation_wait.$anime_show.emit(false);
    });
  }

  deleteOldDate() {
    if (this.data_object) {
      this.labels = [];
      this.data = [];
      this.backgroundColor = [];
      this.hoverBackgroundColor = [];
      this.datasets = [];
    }
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.subscriptionAmount) {
      this.subscriptionAmount.unsubscribe();
    }
  }

  private createObjectChart(data: number[], backgroundColor: string[], hoverBackgroundColor: string[]) {
    const object = {data, backgroundColor, hoverBackgroundColor};
    this.datasets.push(object);
    const labels = this.labels;
    const datasets = this.datasets;
    this.data_object = {labels, datasets};
    this.show_data = true;
    this.animation_wait.$anime_show.emit(false);
  }

  private elaboration_server_data() {
    let count = 0;
    if (this.date_server?.length > 1) {
      this.date_server.sort((a, b) => {
          if (a[2] < b[2]) {
            return 1;
          }
          if (a[2] > b[2]) {
            return -1;
          }
        }
      );
    }
    if (!this.amount) {
      this.amount = 25;
    }
    if (this.date_server?.length > this.amount) {

      this.date_server.length = this.amount;
    }
    this.date_server.forEach(value => {
      const label = value[0] + '  ' + '  /  ' + value[1] + ' ' + this.typeChart;
      this.labels.push(label);
      this.data.push(value[1]);
      if (count === this.colors.length) {
        count = 0;
        this.backgroundColor.push(this.colors[count]);
        this.hoverBackgroundColor.push(this.colors[count]);
      } else {
        this.backgroundColor.push(this.colors[count]);
        this.hoverBackgroundColor.push(this.colors[count]);
      }
      count++;
    });

    this.createObjectChart(this.data, this.backgroundColor, this.hoverBackgroundColor);

  }

}
