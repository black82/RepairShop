import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Repair} from '../entity/Repair';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {faCalendarPlus, faDiagnoses, faIdBadge, faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons/faCalendarCheck';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {ExtendDateService} from '../service/extend-date.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-extend-date-repair',
  templateUrl: './extend-date-repair.component.html',
  styleUrls: ['./extend-date-repair.component.css']
})
export class ExtendDateRepairComponent implements OnInit, OnDestroy {
  @Input()
  repair: Repair;
  formRepair: FormGroup;
  @Input()
  show: boolean;
  id = faIdBadge;
  date = faCalendarPlus;
  save = faMobileAlt;
  date_enter = faCalendarCheck;
  device_icon = faDiagnoses;
  money = faMoneyBill;
  @Input()
  type_modal_normal: boolean;
  private repair_subscribe: Subscription;

  constructor(private fb: FormBuilder,
              private httpService: HttpClien,
              private alert_service: AlertServiceService,
              private animation_wait: AnimeServiceService,
              private extend_date_service: ExtendDateService) {
  }

  ngOnInit(): void {
    this.repair_subscribe = this.extend_date_service.$repair_extend_date_modal.subscribe(repair => {
      this.repair = repair;
      this.show = true;
    });
    this.createForm();

  }

  createForm() {
    this.formRepair = this.fb.group({
      date_complete: [this?.repair?.exp_complet_date, [Validators.required]],
    });
  }

  save_extend_date() {
    if (this.formRepair.invalid) {
      this.alert_service.warn('', 'You have not filled in all' +
        ' the fields, or you have entered inadmissible values. Try again.', false, false, '');
      return;
    }
    if (!this.type_modal_normal) {
      this.closeDialog();
    }
    this.animation_wait.$anime_show.emit(true);
    this.repair.exp_complet_date = this.formRepair.controls.date_complete.value;
    this.httpService.extendDateRepair(this.repair).subscribe(() => {
      this.animation_wait.$anime_show.emit(false);
      if (this.type_modal_normal) {
        this.alert_service.success('', 'The repair was successfully extended', true, false, 'admin/dashboard');
      } else {
        this.alert_service.success('', 'The repair was successfully extended', false, false, '');

      }
    }, error => {
      console.error(error);
    });
  }

  closeDialog() {
    this.show = !this.show;
  }

  ngOnDestroy(): void {
    if (this.repair_subscribe) {
      this.repair_subscribe.unsubscribe();
    }
  }
}
