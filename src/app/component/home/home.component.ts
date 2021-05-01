import {ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faEnvelope, faFileImage, faSignInAlt} from '@fortawesome/free-solid-svg-icons';
import {AdminServiceService} from '../service/admin-service.service';
import {Subscription} from 'rxjs';
import {faStore} from '@fortawesome/free-solid-svg-icons/faStore';
import {faTools} from '@fortawesome/free-solid-svg-icons/faTools';
import {faUserShield} from '@fortawesome/free-solid-svg-icons/faUserShield';

import sparti from 'sparticles';

export declare function animeBackground(sparti): void;

export declare function animeMenu(): void;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(private adminService: AdminServiceService,
              private changeDetectorRef: ChangeDetectorRef) {

  }

  search = faFileImage;
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
  lateralMenuCheck = false;

  @ViewChild('contentPlaceholder') set toolsLabelsAdminCall(element: HTMLElement) {
    this.toolsLabelsAdmin(element);
    this.clickElementCentralIcon(document.querySelectorAll('.box'));
    this.clickElementCTools(document.querySelectorAll('.tools'));
    this.tooltipAnimation();
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
      this.changeDetectorRef.detectChanges();
      clearTimeout(timeout);
    }, 3000);
  }

  clickElementCentralIcon(elementList: NodeListOf<Element>) {
    elementList.forEach(node => {
      node.addEventListener('click', evt => {
        const button = node.querySelector('.box-empty') as HTMLElement;
        node.querySelectorAll('.icon-animation').forEach(className => {
          const htmlElement = document.querySelector('.container-body') as HTMLElement;
          htmlElement.style.minHeight = '100vh';
          className.classList.add('animation1');
          (className as HTMLElement).style.color = '#34495E';
        });
      });
    });
  }

  snouwDisplay() {
    animeMenu();
    const elementById = document.getElementById('menu-buttone');
    if (elementById) {
      elementById.addEventListener('click', () => {
        this.lateralMenuCheck = !this.lateralMenuCheck;
        const ul = document.getElementById('menu-lateral');
        if (this.lateralMenuCheck) {
          ul.setAttribute('style', '-webkit-animation: color-change-2x 2s linear alternate both;\n' +
            '\t        animation: color-change-2x 2s linear alternate both;-elements-785007553.jpg);\n');

        } else {
          setTimeout(() => {
            ul.removeAttribute('style');
          }, 400);

        }
      });
    }
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
            setTimeout(() => {
              className.classList.remove('animation2');
            }, 1000);
          }
        });

      });
    });

  }

  tooltipAnimation() {
    document.querySelectorAll('.icon_cont').forEach(tooltip => {
      tooltip.addEventListener('mouseenter', () => {
        tooltip.classList.add('animation-tooltip');
        setTimeout(() => {
          tooltip.classList.remove('animation-tooltip');
        }, 1000);
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

  toolsLabelsAdmin(element: HTMLElement) {
    const querySelector = document.querySelectorAll('.tools-admin');
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
