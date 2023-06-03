import {EventEmitter, Injectable, Output} from '@angular/core';
import {StatisticRequestInterval} from '../entity/StatisticRequestInterval';

@Injectable({
  providedIn: 'root'
})
export class StatisticRepairIntervalService {
  @Output()
  statistic_interval_month: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  statistic_amount: EventEmitter<number> = new EventEmitter<number>();
  @Output()
  statistic_init_data: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  statistic_complete_data: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  model_parts_statistic: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  $users_amount_statistic: EventEmitter<any> = new EventEmitter<any>();
  @Output()
  $users_amount_shop_statistic: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }
}
