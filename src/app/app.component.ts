import {Component} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {animate, animateChild, group, query, style, transition, trigger} from '@angular/animations';

export const slideInAnimation =
  trigger('routeAnimations', [
    transition('HomePage => AboutPage', [
      query(':enter, :leave',
        style({position: 'fixed', width: '100%'}),
        {optional: true}),
      group([
        query(':enter', [
          style({transform: 'translateX(100%)'}),
          animate('0.6s ease-in-out',
            style({transform: 'translateX(0%)'}))
        ], {optional: true}),
        query(':leave', [
          style({transform: 'translateX(0%)'}),
          animate('0.7s ease-in-out',
            style({transform: 'translateX(-100%)'}))
        ], {optional: true}),
      ])
    ]),
    transition('AboutPage => HomePage', [
      style({position: 'relative'}),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          transition: '1s transition',
        })
      ]),
      query(':enter', [
        style({left: '-100%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('600ms ease-out', style({left: '100%'}))
        ]),
        query(':enter', [
          animate('700ms ease-out', style({left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ]),
  ]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]

})
export class AppComponent {
  title = 'RepairShop';

  constructor(private router: Router) {
    this.router.errorHandler = (error: any) => {
      const routerError = error.toString();
      if (routerError.indexOf('Cannot match any routes') >= 0) {
        this.router.navigate(['/404']);
      } else {
        throw error;
      }
    };
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
