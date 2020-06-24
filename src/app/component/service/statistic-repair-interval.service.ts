import {EventEmitter, Injectable, Output} from '@angular/core';
import {StatisticRequestInterval} from '../entity/StatisticRequestInterval';

@Injectable({
  providedIn: 'root'
})
export class StatisticRepairIntervalService {
  @Output()
  statistic_interval_month: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  statistic_init_data: EventEmitter<Date> = new EventEmitter<Date>();
  @Output()
  statistic_complete_data: EventEmitter<Date> = new EventEmitter<Date>();
  @Output()
  model_parts_statistic: EventEmitter<StatisticRequestInterval> = new EventEmitter<StatisticRequestInterval>();

  constructor() {
  }
}
