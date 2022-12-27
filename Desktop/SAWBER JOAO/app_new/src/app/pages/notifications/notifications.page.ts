import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.page.html',
  styleUrls: ['./notifications.page.scss'],
})
export class NotificationsPage implements OnInit {

  notifications = [];
  user: any = {};

  constructor(
    // private storage: Storage,
    private authService: AuthService,
    private notificationService: NotificationService,
    private message: MessageService
  ) { }

  ngOnInit() {
    this.getUser();
  }

  async getUser() {
    const session = await this.authService.getSession();
    this.user = session.user;
    this.getNotifications({ portador_id: this.user.uuid });
  }

  getNotifications(dados) {
    this.message.load_present();
    this.notificationService.getListing(dados).then(res => {
      this.notifications = res;
    }).finally(() => this.message.load_dismiss());
  }

}
