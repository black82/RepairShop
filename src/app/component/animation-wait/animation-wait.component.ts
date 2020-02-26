import {Component, OnInit} from '@angular/core';

export type FadeState = 'visible' | 'hidden';

@Component({
  selector: 'app-animation-wait',
  templateUrl: './animation-wait.component.html',
  styleUrls: ['./animation-wait.component.css']
})

export class AnimationWaitComponent implements OnInit {


  private _show = true;

  constructor() {
  }

  ngOnInit() {
    setTimeout(() => this._show = false, 3000);
  }
}
