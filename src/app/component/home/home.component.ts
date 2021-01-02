import {Component, OnDestroy, OnInit} from '@angular/core';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faEnvelope, faFileImage, faSignInAlt, faUserFriends} from '@fortawesome/free-solid-svg-icons';
import {AdminServiceService} from '../service/admin-service.service';
import {Subscription} from 'rxjs';
import {faStore} from '@fortawesome/free-solid-svg-icons/faStore';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {faUserShield} from '@fortawesome/free-solid-svg-icons/faUserShield';

import sparti from 'sparticles';

export declare function animeBackground(sparti): void;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  search = faFileImage;
  user_admin = faUserFriends;
  email_send = faEnvelope;
  return = faSignOutAlt;
  entering = faSignInAlt;
  stored = faStore;
  repair = faTools;
  adminIcon = faUserShield;
  labelTolls = '';
  hidem_animation = true;
  admin = false;
  private subscribe_admin: Subscription;

  constructor(private adminService: AdminServiceService) {

  }

  ngOnInit() {
    animeBackground(sparti);
    const view = localStorage.getItem('token');
    if (view) {

      this.admin = true;
      this.clickElementAnimation();
    }
    this.subscribe_admin = this.adminService.$admin_show.subscribe(value => {
      this.showAdminPage(value);
      this.clickElementAnimation();
    });
    this.snouwDisplay();
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

  snouwDisplay() {
    setTimeout(() => {
      const element = document.querySelector('footer');
      element.childNodes.forEach(node => {
        const node1 = node as HTMLElement;
        node1.style.boxShadow = 'inset 0px -50px 27px -30px #EFFFFB';
      });
    }, 100);
  }

  showAdminPage(value) {
    this.admin = value;
  }

  clickElementAnimation() {
    this.tooltipAnimation();
    this.clickElementCentralIcon(document.querySelectorAll('.box'));
    this.clickElementCTools(document.querySelectorAll('.tools'));
    this.toolsLabels();
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

  toolsLabels() {
    const querySelector = document.querySelectorAll('.tools');
    querySelector.forEach(node => {
      node.childNodes.forEach(child => {
        child.addEventListener('mouseenter', evt => {
          this.createLabelToEvent(evt.target.classList);
          child.addEventListener('mouseleave', () => {
            this.labelTolls = '';
          });
        });
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe_admin) {
      this.subscribe_admin.unsubscribe();
    }

  }

  private createLabelToEvent(classList: any) {
    if (classList) {
      console.log('Creating Label' + classList);
      switch (classList.value) {
        case 'icon icon-mobile-phone icon-animation': {
          this.labelTolls = 'Create Repair';
          break;
        }
        case 'icon icon-check icon-animation': {
          this.labelTolls = 'Close Repair';
          break;
        }
        case 'icon icon-search icon-animation': {
          this.labelTolls = 'Search By Phone Number';
          break;
        }
        case 'icon icon-lock icon-animation': {
          this.labelTolls = 'Log In';
          break;
        }
        case 'icon icon-bar-chart icon-animation': {
          this.labelTolls = 'Statistics Company';
          break;
        }
        case 'icon icon-wrench icon-animation': {
          this.labelTolls = 'Admin DashBoar';
          break;
        }
        case 'icon icon-calendar icon-animation': {
          this.labelTolls = 'Extend Repair';
          break;
        }
        case 'icon icon-envelope-alt icon-animation': {
          this.labelTolls = 'Send Email Message';
          break;
        }
      }
    }
  }
}
