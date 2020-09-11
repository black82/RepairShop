import {Component, OnDestroy, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faEnvelope, faSignInAlt, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {AdminServiceService} from '../service/admin-service.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  search = faSearch;
  user_admin = faUserFriends;
  email_send = faEnvelope;
  return = faSignOutAlt;
  entering = faSignInAlt;
  hidem_animation = true;
  admin = false;
  private subscribe_admin: Subscription;

  constructor(private adminService: AdminServiceService) {
  }

  ngOnInit() {
    const view = localStorage.getItem('token');
    if (view) {

      this.admin = true;
    }
    this.subscribe_admin = this.adminService.$admin_show.subscribe(value => {
      this.showAdminPage(value);
    });

    this.clickElementAnimation();
    const timeout = setTimeout(() => {
      this.hidem_animation = false;
      clearTimeout(timeout);
    }, 3000);
  }

  clickElementCentralIcon(elementList: NodeListOf<Element>) {

    elementList.forEach(node => {
      node.addEventListener('click', evt => {
        const button = node.querySelector('.box-empty') as HTMLElement;
        // node.querySelector('.tooltip').removeAttribute('tooltip');
        node.querySelectorAll('.icon-animation').forEach(className => {
          if (className.className === (evt.target as Element).className) {
            button.style.height = '160px';
            className.classList.add('animation1');
            (className as HTMLElement).style.color = '#34495E';
          }
        });
      });
    });
  }

  showAdminPage(value) {
    this.admin = value;
  }

  clickElementAnimation() {
    this.tooltipAnimation();
    this.clickElementCentralIcon(document.querySelectorAll('.box'));
    this.clickElementCTools(document.querySelectorAll('.tools'));

  }

  clickElementCTools(elementList: NodeListOf<Element>) {
    elementList.forEach(node => {
      node.addEventListener('mouseenter', evt => {
        const classList = node.querySelectorAll('.icon-animation');
        classList.forEach(className => {
          if (className.className === (evt.target as Element).className) {
            className.classList.add('animation2');
            (className as HTMLElement).style.color = '#34495E';
          }
        });

      });
    });

  }

  tooltipAnimation() {
    document.querySelectorAll('.icon_cont').forEach(tooltip => {
      tooltip.addEventListener('mouseenter', () => {
        tooltip.classList.add('animation-tooltip');
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe_admin) {
      this.subscribe_admin.unsubscribe();
    }
  }
}
