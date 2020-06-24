export class StatisticRequestInterval {
  data_init_interval: Date;
  data_complete_interval: Date;

  constructor(data_init_interval: Date, data_complete_interval: Date) {
    this.data_init_interval = data_init_interval;
    this.data_complete_interval = data_complete_interval;
  }
}
