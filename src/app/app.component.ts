import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Router, RouterOutlet} from '@angular/router';
import {animate, query, style, transition, trigger} from '@angular/animations';
import {StaffUser} from './component/entity/StaffUser';
import {HttpClien} from './component/service/clientservice.service';

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
export class AppComponent implements OnDestroy {
  title = 'RepairShop';
  @Output()
  $routerAnime: EventEmitter<StaffUser> = new EventEmitter();

  // @HostListener('window:beforeunload')
  // unloadHandler(event) {
  //   console.log('looutevent');
  //   this.logoutOnClose();
  //   localStorage.clear();
  // }

  constructor(private router: Router, private http: HttpClien) {
    //   localStorage.clear();
    this.router.errorHandler = (error: any) => {
      const routerError = error.toString();
      if (routerError.indexOf('Cannot match any routes') >= 0) {
        this.router.navigate(['/404']);
      } else {
        throw error;
      }
    };
    //  const context = this;
    // window.addEventListener('beforeunload', (e) => {
    //   const currentUser = JSON.parse(localStorage.getItem('token'));
    //   if (currentUser) {
    //     context.logoutOnClose();
    //   }
    // });
  }

  prepareRoute(outlet: RouterOutlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }

  logoutOnClose() {
    this.http.logout();
  }

  ngOnDestroy(): void {
    this.logoutOnClose();
  }

}
