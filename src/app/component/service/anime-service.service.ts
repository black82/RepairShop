import {EventEmitter, Injectable, Output} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnimeServiceService {
  @Output()
  $anime_show: EventEmitter<boolean> = new EventEmitter();

  constructor() {
  }
}
