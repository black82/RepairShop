import {Component, OnInit} from '@angular/core';
import {faSearch} from '@fortawesome/free-solid-svg-icons/faSearch';
import {faSignOutAlt} from '@fortawesome/free-solid-svg-icons/faSignOutAlt';
import {faSignInAlt} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search = faSearch;
  return = faSignOutAlt;
  entering = faSignInAlt;
  hidem_animation = true;

  constructor() {
  }

  ngOnInit() {
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

        node.querySelector('.tooltip').removeAttribute('tooltip');
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

  clickElementAnimation() {
    this.tooltipAnimation();
    this.clickElementCentralIcon(document.querySelectorAll('.box'));
    this.clickElementCTools(document.querySelectorAll('.tools'));
  }

  clickElementCTools(elementList: NodeListOf<Element>) {
    elementList.forEach(node => {
      node.addEventListener('click', evt => {
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
    document.querySelectorAll('.tooltip').forEach(tooltip => {
      tooltip.addEventListener('mouseenter', evt => {
        tooltip.classList.add('animation-tooltip');
      });
    });
  }
}
