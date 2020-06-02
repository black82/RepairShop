import {Component, OnDestroy, OnInit} from '@angular/core';
import {AnimeServiceService} from '../service/anime-service.service';

export type FadeState = 'visible' | 'hidden';

@Component({
  selector: 'app-animation-wait',
  templateUrl: './animation-wait.component.html',
  styleUrls: ['./animation-wait.component.css']
})

export class AnimationWaitComponent implements OnInit, OnDestroy {

  showAnimation = false;


  constructor(private anime_service: AnimeServiceService) {
  }

  ngOnInit() {
    this.anime_service.$anime_show.subscribe(val => {
      if (val) {
        this.show();
      } else {
        this.hide();
      }
    });

  }

  show() {
    const elementById = document.getElementById('loading');
    elementById.classList.add('anime-start');
    elementById.classList.remove('anime-hide');
  }

  hide() {
    const elementById = document.getElementById('loading');
    elementById.classList.add('anime-hide');
    elementById.classList.remove('anime-start');

  }

  ngOnDestroy(): void {
    this.anime_service.$anime_show.unsubscribe();
  }
}
