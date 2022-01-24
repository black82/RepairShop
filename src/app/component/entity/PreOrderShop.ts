export class PreOrderShop {
  orderId: number;

  userId: number;

  userName: number;

  dateInit: Date;


  completeDate: Date;

  typeOrder: string;

  color: string;

  model: string;

  typeObject: string;

  deposit: number;

  price: number;

  note: string;

  invoiceInput: string;

  invoiceOutput: string;

  orderStatus: string;


  constructor(orderId: number, userId: number, userName: number,
              dateInit: Date, completeDate: Date, typeOrder: string,
              color: string, model: string, typeObject: string, deposit: number,
              price: number, note: string, invoiceInput: string, invoiceOutput: string,
              orderStatus: string) {
    this.orderId = orderId;
    this.userId = userId;
    this.userName = userName;
    this.dateInit = dateInit;
    this.completeDate = completeDate;
    this.typeOrder = typeOrder;
    this.color = color;
    this.model = model;
    this.typeObject = typeObject;
    this.deposit = deposit;
    this.price = price;
    this.note = note;
    this.invoiceInput = invoiceInput;
    this.invoiceOutput = invoiceOutput;
    this.orderStatus = orderStatus;
  }
}
