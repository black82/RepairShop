import {EventEmitter, Injectable, Output} from '@angular/core';
import {Client} from '../entity/ClientWeb';

@Injectable({
  providedIn: 'root'
})
export class DeviceInputService {
  @Output()
  $client_push: EventEmitter<Client> = new EventEmitter();

  constructor() {
  }
}
