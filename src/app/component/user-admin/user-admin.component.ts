import {Component, OnInit} from '@angular/core';
import {HttpClien} from '../service/clientservice.service';
import {faUser} from '@fortawesome/free-solid-svg-icons/faUser';
import {StaffUser} from '../entity/StaffUser';
import {AlertServiceService} from '../service/alert-service.service';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons/faUserEdit';
import {faUserFriends} from '@fortawesome/free-solid-svg-icons/faUserFriends';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  isAdmin = false;
  user_icon = faUser;
  user_disable = faUserEdit;
  user_active = faUserFriends;
  users: StaffUser[];
  showUser = false;

  constructor(private httpService: HttpClien,
              private alertService: AlertServiceService,
  ) {
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

  getAllUsers() {
    this.httpService.getAllUser().subscribe(value => {
      this.users = value;
      this.showUser = true;
    });
  }

  disableUser(user: StaffUser) {
    this.httpService.disableUser(user).subscribe(() => {
      this.alertService.success(null, 'This user has been successfully disabled',
        false, true, '');
    }, error => {
      console.error(error);
    });
    user.enabled = false;
  }

  empowerUser(user: StaffUser) {
    this.httpService.activeUser(user).subscribe(() => {
      this.alertService.success(null, 'This user has been successfully activate',
        false, true, '');
    }, error => {
      console.error(error);
    });
    user.enabled = true;
  }

}
