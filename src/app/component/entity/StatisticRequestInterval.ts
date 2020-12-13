export class StatisticRequestInterval {
  data_init_interval: Date;
  data_complete_interval: Date;
  type: string;

  constructor(data_init_interval: Date, data_complete_interval: Date, type: string = null) {
    this.data_init_interval = data_init_interval;
    this.data_complete_interval = data_complete_interval;
    this.type = type;
  }
}
