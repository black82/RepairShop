import {Component, OnDestroy, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {HttpClien} from '../service/clientservice.service';

@Component({
  selector: 'app-log-service',
  templateUrl: './log-service.component.html',
  styleUrls: ['./log-service.component.css']
})
export class LogServiceComponent implements OnInit, OnDestroy {
  logHtml: SafeHtml;
  hidden = true;

  constructor(private sanitizer: DomSanitizer, private httpClient: HttpClien) {
  }

  ngOnInit(): void {
  }

  serviceGetLogHtml(): void {
    this.hidden = false;
    this.httpClient.logGetHtml().subscribe(html => {
      this.logHtml = this.sanitizer.bypassSecurityTrustHtml(html);
    }, error => {
      console.log(error?.error?.message);
    });

  }

  showHidden(): void {
    this.hidden = !this.hidden;
  }

  ngOnDestroy(): void {
  }

}
