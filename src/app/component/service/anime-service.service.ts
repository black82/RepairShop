import {EventEmitter, Injectable, Output} from '@angular/core';
import {StaffUser} from '../entity/StaffUser';

@Injectable({
  providedIn: 'root'
})
export class AnimeServiceService {
  @Output()
  $anime_show: EventEmitter<boolean> = new EventEmitter();

  @Output()
  $show_user: EventEmitter<StaffUser> = new EventEmitter();
  @Output()
  $show_user_header: EventEmitter<StaffUser> = new EventEmitter();

  constructor() {
  }
}
