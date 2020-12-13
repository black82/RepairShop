import {Component, OnInit} from '@angular/core';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons/faCalendarCheck';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faCalendarAlt} from '@fortawesome/free-solid-svg-icons/faCalendarAlt';
import {faChartArea} from '@fortawesome/free-solid-svg-icons/faChartArea';
import {ColorsStringArray} from '../entity/ColorsStringArray';
import {StatisticRepairIntervalService} from '../service/statistic-repair-interval.service';
import {faRemoveFormat} from '@fortawesome/free-solid-svg-icons/faRemoveFormat';
import {StatisticRequestInterval} from '../entity/StatisticRequestInterval';
import {faCartPlus} from '@fortawesome/free-solid-svg-icons/faCartPlus';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrls: ['./statistic.component.css']
})
export class StatisticComponent implements OnInit {
  data_object: {
    labels: string[], datasets: object[]
  };
  cart = faCartPlus;
  date = faCalendarCheck;
  statistic_button = faChartArea;
  date_init = faCalendarAlt;
  formDataInterval: FormGroup;
  show_chart = false;
  date_server: { model: string, amount: number }[];
  colors: string[];
  labels: string[] = [];
  datasets: { data: number[]; backgroundColor: string[]; hoverBackgroundColor: string[]; }[] = [];
  data: number[] = [];
  backgroundColor: string[] = [];
  hoverBackgroundColor: string[] = [];
  sum_device: number;
  reject = faRemoveFormat;
  title = 'Device repaired';
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
    this.formDataInterval = this.formBuilder.group({
      date_init: [null, Validators.required],

      date_complete: [null, Validators.required],
      amount: [null]
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

  getData() {
    if (this.formDataInterval.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    this.deleteOldDate();
    this.animation_wait.$anime_show.emit(true);
    const init_date = this.formDataInterval.controls.date_init.value;
    const complete_date = this.formDataInterval.controls.date_complete.value;
    this.httpService.intervalRepairMaidStatisticByModel(init_date, complete_date).subscribe(value => {
      this.date_server = value;
      this.show_chart = true;
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
      this.sum_device = 0;
      this.datasets = [];
    }
  }

  getDataByMonth() {
    if (this.formDataInterval.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    this.service_show_statistic.statistic_init_data.emit(this.formDataInterval.controls.date_init.value);
    this.service_show_statistic.statistic_complete_data.emit(this.formDataInterval.controls.date_complete.value);
    this.service_show_statistic.statistic_interval_month.emit(true);
  }

  hidden_container() {
    this.show_chart = false;
  }

  getDataByModelAndParts() {
    if (this.formDataInterval.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    let amount = this.formDataInterval.controls.amount.value;
    if (!amount) {
      amount = 25;
    }

    this.service_show_statistic.statistic_amount.emit(amount);
    this.service_show_statistic.model_parts_statistic
      .emit(new StatisticRequestInterval(this.formDataInterval.controls.date_init.value,
        this.formDataInterval.controls.date_complete.value));
  }

  getDataByUsersBayingAmount() {
    if (this.formDataInterval.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    let amount = this.formDataInterval.controls.amount.value;
    if (!amount) {
      amount = 25;
    }
    console.log(amount);
    this.service_show_statistic.statistic_amount.emit(amount);
    this.service_show_statistic.$users_amount_shop_statistic
      .emit(new StatisticRequestInterval(this.formDataInterval.controls.date_init.value,
        this.formDataInterval.controls.date_complete.value, 'open'));
  }

  getDataByUsersCloseAmount() {
    if (this.formDataInterval.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    let amount = this.formDataInterval.controls.amount.value;
    if (!amount) {
      amount = 25;
    }

    this.service_show_statistic.statistic_amount.emit(amount);
    this.service_show_statistic.$users_amount_statistic
      .emit(new StatisticRequestInterval(this.formDataInterval.controls.date_init.value,
        this.formDataInterval.controls.date_complete.value, 'close'));
  }

  getDataByUsersOpenRepairAmount() {
    if (this.formDataInterval.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    let amount = this.formDataInterval.controls.amount.value;
    if (!amount) {
      amount = 25;
    }

    this.service_show_statistic.statistic_amount.emit(amount);
    this.service_show_statistic.$users_amount_statistic
      .emit(new StatisticRequestInterval(this.formDataInterval.controls.date_init.value,
        this.formDataInterval.controls.date_complete.value, 'open'));
  }

  getDataByUsersAmountByShop() {
    if (this.formDataInterval.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    let amount = this.formDataInterval.controls.amount.value;
    if (!amount) {
      amount = 25;
    }

    this.service_show_statistic.statistic_amount.emit(amount);
    this.service_show_statistic.$users_amount_shop_statistic
      .emit(new StatisticRequestInterval(this.formDataInterval.controls.date_init.value,
        this.formDataInterval.controls.date_complete.value, 'close'));
  }

  getDataShop() {
    if (this.formDataInterval.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    this.deleteOldDate();
    this.animation_wait.$anime_show.emit(true);
    const init_date = this.formDataInterval.controls.date_init.value;
    const complete_date = this.formDataInterval.controls.date_complete.value;
    this.httpService.intervalShopModelMaidStatisticByModel(init_date, complete_date).subscribe(value => {
      this.date_server = value;
      this.title = 'Device sell in shop';
      this.show_chart = true;
      this.elaboration_server_data();
    }, () => {
      this.animation_wait.$anime_show.emit(false);
    });
  }

  private createObjectChart(data: number[], backgroundColor: string[], hoverBackgroundColor: string[]) {
    const object = {data, backgroundColor, hoverBackgroundColor};
    this.datasets.push(object);
    const labels = this.labels;
    const datasets = this.datasets;
    this.data_object = {labels, datasets};
    this.show_chart = true;
    this.animation_wait.$anime_show.emit(false);
  }

  private sumDevice(): number {
    let sum = 0;
    this.date_server.forEach(value => {
      sum += value[1];
    });
    this.sum_device = sum;
    return sum;
  }

  private elaboration_server_data() {
    let count = 0;
    const sum = this.sumDevice();
    if (this.date_server?.length > 1) {
      this.date_server.sort((a, b) => {
          if (a[1] < b[1]) {
            return 1;
          }
          if (a[1] > b[1]) {
            return -1;
          }
        }
      );
    }
    let amount = this.formDataInterval.controls.amount.value;
    if (!amount) {
      amount = 25;
    }
    if (this.date_server?.length > amount) {

      this.date_server.length = amount;
    }
    this.date_server.forEach(value => {
      let percent = (value[1] * 100) / sum;
      percent = parseFloat(percent.toFixed(2));
      const label = value[0] + '  /  ' + percent + ' % ';
      this.labels.push(label);
      this.data.push(value[1]);
      if (count === this.colors.length) {
        count = 0;
      } else {
        this.backgroundColor.push(this.colors[count]);
        this.hoverBackgroundColor.push(this.colors[count]);
      }
      count++;
    });

    this.createObjectChart(this.data, this.backgroundColor, this.hoverBackgroundColor);

  }


  getDataByMonthShop() {
    if (this.formDataInterval.invalid) {
      this.alertService.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    this.service_show_statistic.statistic_init_data.emit(this.formDataInterval.controls.date_init.value);
    this.service_show_statistic.statistic_complete_data.emit(this.formDataInterval.controls.date_complete.value);
    this.service_show_statistic.statistic_interval_month.emit(false);
  }


}
