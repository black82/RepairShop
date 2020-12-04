import {Injectable} from '@angular/core';

import SockJs from 'sockjs-client';

import Stomp from 'stompjs';
import {HttpClien} from './clientservice.service';
import {MessageInvoice} from '../entity/MessageInvoice';


@Injectable()
export class WebSocketService {
  socket;

  constructor(private http: HttpClien) {
  }

  public connect() {
    this.socket = new SockJs(this.http.apiUrl + 'socket');
    return Stomp.over(this.socket);
  }

  public disconnection() {
    if (this.socket) {
      this.socket.close();
    }

  }

  public addNewMessage(message: MessageInvoice) {
    if (this.socket) {
      this.socket.send('/ app / send / message', {}, message);
    }
  }
}
