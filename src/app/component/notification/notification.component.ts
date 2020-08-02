import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from '../service/WebSocketService';
import {MessageInvoice} from '../entity/MessageInvoice';
import {faBell} from '@fortawesome/free-solid-svg-icons/faBell';
import {faBellSlash} from '@fortawesome/free-solid-svg-icons/faBellSlash';
import {faCommentAlt} from '@fortawesome/free-solid-svg-icons';
import {AdminServiceService} from '../service/admin-service.service';
import {Subscription} from 'rxjs';
import {HttpClien} from '../service/clientservice.service';
import {AlertServiceService} from '../service/alert-service.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit, OnDestroy {

  notification: MessageInvoice[] = [];
  notifications: MessageInvoice;
  counters = 0;
  notificationIcon = faBellSlash;
  notificationIconPresent = faBell;
  commentIcon = faCommentAlt;
  wiuNotification = false;
  private subscribe: Subscription;
  private subscription: Subscription;

  constructor(private webSocketService: WebSocketService,
              private adminService: AdminServiceService,
              private httpClient: HttpClien,
              private alertService: AlertServiceService) {
  }

  ngOnInit(): void {
    this.deleteAndSubscribe();

    this.adminService.$user_show.subscribe(value => {
      this.wiuNotification = value;
      if (value) {
        this.getAllRejectNotification();
        const stompClient = this.webSocketService.connect();
        stompClient.connect({}, () => {
          this.subscribe = stompClient.subscribe('/topic/notification', notifications => {
            this.notifications = JSON.parse(notifications.body);
            this.notification.push(this.notifications);
            this.counters = this.notification.length;
            this.bellAnimation();
            this.counterAnime();
            this.soundAlert();
          });
        });
      } else {
        this.webSocketService.disconnection();
      }
    });

  }

  bellAnimation(): void {
    const iconBell = document.getElementById('icon-noti');
    iconBell.classList.add('notification-anime');
    const timeout = setTimeout(() => {
      iconBell.classList.remove('notification-anime');
      clearTimeout(timeout);
    }, 15000);
  }

  counterAnime() {
    if (this.counters > 1) {
      const notify = document.getElementById('counter-notify');
      notify.classList.add('counter-anime');
      const timeout = setTimeout(() => {
        notify.classList.remove('counter-anime');
        clearTimeout(timeout);
      }, 1000);
    }
  }

  editResandMessage(not: MessageInvoice) {
    this.adminService.$show_notified.emit(not);
  }

  deleteAndSubscribe() {
    this.subscription = this.adminService.$deleteMessage.subscribe(message => {
      this.httpClient.deleteRejectNotification(message.message_id).subscribe(
        (() => {
        })
      );
      this.notification.splice(this.notification.indexOf(message), 1);
      this.counters = this.notification.length;
    });
  }

  ngOnDestroy(): void {
    if (this.subscribe) {
      this.subscribe.unsubscribe();
    }
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getAllRejectNotification() {
    setTimeout(() => {
      this.httpClient.getAllRejectNotification().subscribe(notifications1 => {
        this.notification = notifications1;
        this.counters = notifications1.length;
      });
    }, 1000);

  }

  soundAlert() {
    this.alertService.soundAlert();
  }


}
