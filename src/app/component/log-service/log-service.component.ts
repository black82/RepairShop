import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClien} from '../service/clientservice.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {faFileMedicalAlt} from '@fortawesome/free-solid-svg-icons/faFileMedicalAlt';

@Component({
  selector: 'app-log-service',
  templateUrl: './log-service.component.html',
  styleUrls: ['./log-service.component.css']
})
export class LogServiceComponent implements OnInit, OnDestroy {
  logHtml: SafeHtml;
  hidden = true;
  logs = faFileMedicalAlt;
  constructor(private sanitizer: DomSanitizer,
              private httpClient: HttpClien,
              private animation_wait: AnimeServiceService) {
  }

  ngOnInit(): void {
  }

  serviceGetLogHtml(): void {
    this.hidden = false;
    this.animation_wait.$anime_show.emit(true);
    this.httpClient.logGetHtml().subscribe(html => {
      this.animation_wait.$anime_show.emit(false);
      this.logHtml = this.sanitizer.bypassSecurityTrustHtml(html);
      this.resizeTableHtml();
    }, error => {
      this.animation_wait.$anime_show.emit(false);
      console.log(error?.error?.message);
    });

  }

  resizeTableHtml() {
    let htmlTableElement = null;
    let count = 0;
    const timeout = setInterval(() => {
      count++;
      console.log(count);
      htmlTableElement = document.querySelectorAll('table');
      if (htmlTableElement) {
        htmlTableElement.forEach(element => {
          element.style.zoom = '74%';
        });

        clearInterval(timeout);
      }
      if (count > 30) {
        clearInterval(timeout);
      }
    }, 300);
  }

  showHidden(): void {
    this.hidden = !this.hidden;
  }

  ngOnDestroy(): void {
  }

}
