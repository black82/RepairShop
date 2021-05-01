import {Component, EventEmitter, Output} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {StaffUser} from './component/entity/StaffUser';

export const fadeAnimation =

  trigger('fadeAnimation', [

    transition('* => *', [

      query(':enter',
        [
          style({opacity: 0})
        ],
        {optional: true}
      ),

      query(':leave',
        [
          style({opacity: 1}),
          animate('0.5s', style({opacity: 0}))
        ],
        {optional: true}
      ),

      query(':enter',
        [
          style({opacity: 0}),
          animate('0.5s', style({opacity: 1}))
        ],
        {optional: true}
      )

    ])

  ]);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [fadeAnimation]

})
export class AppComponent {
  title = 'RepairShop';
  @Output()
  $routerAnime: EventEmitter<StaffUser> = new EventEmitter();

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
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
