import {Component, OnInit} from '@angular/core';
import {faRemoveFormat} from '@fortawesome/free-solid-svg-icons/faRemoveFormat';
import {StatisticRepairIntervalService} from '../service/statistic-repair-interval.service';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {Subscription} from 'rxjs';
import {StatisticModelParts} from '../entity/StatisticModelParts';
import {ColorsStringArray} from '../entity/ColorsStringArray';

@Component({
  selector: 'app-statistic-model-parts',
  templateUrl: './statistic-model-parts.component.html',
  styleUrls: ['./statistic-model-parts.component.css']
})
export class StatisticModelPartsComponent implements OnInit {
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
  private subscribe: Subscription;

  constructor(private service_show_statistic: StatisticRepairIntervalService,
              private httpService: HttpClien,
              private alertService: AlertServiceService,
              private animation_wait: AnimeServiceService) {

  }

  ngOnInit(): void {
    this.checkAuth();
    if (this.isAdmin) {
      return;
    }
    this.subscribe = this.service_show_statistic.model_parts_statistic.subscribe(request => {
      if (request) {
        this.colors = new ColorsStringArray().getColors();
        this.init_data = request.data_init_interval;
        this.complete_date = request.data_complete_interval;
        this.getDateBackend();
      }
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

  getDateBackend() {
    this.deleteOldDate();
    this.animation_wait.$anime_show.emit(true);
    this.httpService.intervalRepairModelAndPartsStatistic(this.init_data, this.complete_date).subscribe(value => {
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

  private elaboration_server_data() {
    let count = 0;
    this.date_server.forEach(value => {
      console.log(value);
      const label = value[0] + ' ' + '/ ' + value[1];
      this.labels.push(label);
      this.data.push(value[2]);
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

  private createObjectChart(data: number[], backgroundColor: string[], hoverBackgroundColor: string[]) {
    const object = {data, backgroundColor, hoverBackgroundColor};
    this.datasets.push(object);
    const labels = this.labels;
    const datasets = this.datasets;
    this.data_object = {labels, datasets};
    this.show_data = true;
    this.animation_wait.$anime_show.emit(false);
  }
}
