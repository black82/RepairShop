export class StatisticModelParts {
  model: string;
  parts_replaced: string;
  amount: number;

  constructor(model: string, parts_replaced: string, amount: number) {
    this.model = model;
    this.parts_replaced = parts_replaced;
    this.amount = amount;
  }
}
