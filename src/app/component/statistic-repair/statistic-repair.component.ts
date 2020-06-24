import {Component, OnInit} from '@angular/core';
import {StatisticRepairIntervalService} from '../service/statistic-repair-interval.service';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {Subscription} from 'rxjs';
import {StatisticModel} from '../entity/StatisticModel';
import {faRemoveFormat} from '@fortawesome/free-solid-svg-icons/faRemoveFormat';

@Component({
  selector: 'app-statistic-repair',
  templateUrl: './statistic-repair.component.html',
  styleUrls: ['./statistic-repair.component.css']
})
export class StatisticRepairComponent implements OnInit {

  data_object: {
    labels: string[], datasets: object[]
  };
  date_init: Date;
  date_complete: Date;
  show_data = false;
  labels: string[] = [];
  data: number[] = [];
  reject = faRemoveFormat;
  private subscribe: Subscription;
  private isAdmin: boolean;

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
    this.service_show_statistic.statistic_init_data.subscribe(data => {
      this.date_init = data;
    });
    this.service_show_statistic.statistic_complete_data.subscribe(data => {
      this.date_complete = data;
    });
    this.subscribe = this.service_show_statistic.statistic_interval_month.subscribe(value => {
      if (value) {
        this.get_data_to_server();

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

  get_data_to_server() {
    this.animation_wait.$anime_show.emit(true);
    this.httpService.intervalRepairMaidStatisticByMonth(this.date_init, this.date_complete)
      .subscribe(data_set => {
        this.animation_wait.$anime_show.emit(false);
        this.deleteOldDate();
        this.create_data_set(data_set);
      }, () => {
        this.animation_wait.$anime_show.emit(false);
      });
  }

  create_data_set(data_set: StatisticModel[]) {
    data_set.forEach(d => {
      this.labels.push(d.valueString);
      this.data.push(d.amount);
    });
    this.create_object_statistic(this.labels, this.data);
  }

  deleteOldDate() {
    if (this.data_object) {
      this.labels = [];
      this.data = [];
    }
  }

  hidden_container() {
    this.show_data = false;
  }

  private create_object_statistic(labels: string[],
                                  data: number[]) {
    const datasets = [{label: 'Repairs performed this period ', backgroundColor: '#42A5F5', borderColor: '#42A5F5', data}];
    this.data_object = {labels, datasets};
    this.show_data = true;
  }
}
