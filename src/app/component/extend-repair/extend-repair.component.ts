import {Component, OnInit} from '@angular/core';
import {Repair} from '../entity/Repair';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';
import {AnimeServiceService} from '../service/anime-service.service';
import {faCalendarPlus, faDiagnoses, faIdBadge, faMoneyBill} from '@fortawesome/free-solid-svg-icons';
import {faMobileAlt} from '@fortawesome/free-solid-svg-icons/faMobileAlt';
import {faCalendarCheck} from '@fortawesome/free-solid-svg-icons/faCalendarCheck';

@Component({
  selector: 'app-extend-repair',
  templateUrl: './extend-repair.component.html',
  styleUrls: ['./extend-repair.component.css']
})
export class ExtendRepairComponent implements OnInit {
  button = 'Extend Repair';
  nameForm = 'Search Repair by Extent Time';
  repair: Repair;
  formRepair: FormGroup;
  isAdmin = false;
  id = faIdBadge;
  date = faCalendarPlus;
  save = faMobileAlt;
  date_enter = faCalendarCheck;
  device_icon = faDiagnoses;
  money = faMoneyBill;


  constructor(private fb: FormBuilder,
              private httpService: HttpClien,
              private alert_service: AlertServiceService,
              private animation_wait: AnimeServiceService) {
  }

  ngOnInit(): void {
    this.checkAuth();
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
    console.log(repair);
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
    this.animation_wait.$anime_show.emit(true);
    this.repair.exp_complet_date = this.formRepair.controls.date_complete.value;
    this.httpService.extendDateRepair(this.repair).subscribe(() => {
      this.animation_wait.$anime_show.emit(false);
      this.alert_service.success('', 'The repair was successfully extended', true, false, 'admin/dashboard');

    }, error => {
      console.error(error);
    });
  }
}
