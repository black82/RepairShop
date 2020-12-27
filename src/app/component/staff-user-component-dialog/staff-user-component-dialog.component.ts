import {Component, OnDestroy, OnInit} from '@angular/core';
import {StaffUser} from '../entity/StaffUser';
import {faUserAlt} from '@fortawesome/free-solid-svg-icons';
import {faEnvelopeOpenText} from '@fortawesome/free-solid-svg-icons/faEnvelopeOpenText';
import {faUserCog} from '@fortawesome/free-solid-svg-icons/faUserCog';
import {faUsersCog} from '@fortawesome/free-solid-svg-icons/faUsersCog';
import {faCriticalRole} from '@fortawesome/free-brands-svg-icons/faCriticalRole';
import {AnimeServiceService} from '../service/anime-service.service';
import {Subscription} from 'rxjs';
import {faWindowClose} from '@fortawesome/free-solid-svg-icons/faWindowClose';

@Component({
  selector: 'app-staff-user-component-dialog',
  templateUrl: './staff-user-component-dialog.component.html',
  styleUrls: ['./staff-user-component-dialog.component.css']
})
export class StaffUserComponentDialogComponent implements OnInit, OnDestroy {

  showDialog: boolean;
  staffUser: StaffUser;
  iconUserName = faUserAlt;
  iconUserEmail = faEnvelopeOpenText;
  iconUserNickName = faUserCog;
  iconUserRoles = faUsersCog;
  iconUserPosition = faCriticalRole;
  closeIcon = faWindowClose;
  private subscription: Subscription;
  private subscription_header: Subscription;

  constructor(private animeService: AnimeServiceService) {
  }

  ngOnInit(): void {
    this.subscription = this.animeService.$show_user.subscribe(user => {
      this.staffUser = user;
      this.showDialog = true;
      this.animeService.$anime_show.emit(false);
    });
    this.subscription_header = this.animeService.$show_user_header.subscribe(user => {
      this.staffUser = user;
      this.showDialog = true;
      this.animeService.$anime_show.emit(false);
    });
  }

  hideDialog() {
    this.showDialog = false;
    this.staffUser = null;
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    if (this.subscription_header) {
      this.subscription_header.unsubscribe();
    }
  }
}
