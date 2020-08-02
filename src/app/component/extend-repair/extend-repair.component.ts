import {Component, OnDestroy, OnInit} from '@angular/core';
import {Repair} from '../entity/Repair';
import {FormBuilder} from '@angular/forms';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {FormhidenService} from '../service/formhiden.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-extend-repair',
  templateUrl: './extend-repair.component.html',
  styleUrls: ['./extend-repair.component.css']
})
export class ExtendRepairComponent implements OnInit, OnDestroy {
  button = 'Extend Repair';
  nameForm = 'Search Repair by Extent Time';
  isAdmin = false;
  repair: Repair;
  showRepair = false;
  private event_form: Subscription;

  constructor(private fb: FormBuilder,
              private httpService: HttpClien,
              private alert_service: AlertServiceService,
              private animation_wait: AnimeServiceService,
              private hide_form: FormhidenService) {
  }

  ngOnInit(): void {
    this.checkAuth();
    this.event_form = this.hide_form.form_open.subscribe(value => {
      this.showRepair = value;
    });
  }

  checkAuth() {
    const item = localStorage.getItem('token');
    if (item) {
      this.httpService.isAdmin(item).subscribe(value => {
        this.isAdmin = value;
      }, error => {
        console.log(error);
      });
    }
  }

  repair_catch(repair) {
    this.repair = repair;
    this.hide_form.form_open.emit(true);
  }

  ngOnDestroy(): void {
    if (this.event_form) {
      this.event_form.unsubscribe();
    }
  }
}
