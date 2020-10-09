import {Component} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'RepairShoop';

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
}
