export class MessageInvoice {
  message_id: number;
  destination_user: string;
  message_sid: string;
  message_subject: string;
  message_type: string;
  message_status: string;
  type_sender: string;
  message_body: string;
  date_send: Date;
  date_Status: Date;
  price: number;
  repair_Id: number;


  constructor(message_id: number, destination_user: string, message_sid: string, message_subject: string,
              message_type: string, message_status: string, message_body: string, date_send: Date,
              date_Status: Date, price: number, repair_Id: number) {
    this.message_id = message_id;
    this.destination_user = destination_user;
    this.message_sid = message_sid;
    this.message_subject = message_subject;
    this.message_type = message_type;
    this.message_status = message_status;
    this.message_body = message_body;
    this.date_send = date_send;
    this.date_Status = date_Status;
    this.price = price;
    this.repair_Id = repair_Id;
  }

}
