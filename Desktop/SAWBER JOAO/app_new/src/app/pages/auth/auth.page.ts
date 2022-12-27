import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';

import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {

  dados: any = { login: '', senha: '' };

  constructor(
    private appService: AppService,
    private navCtrl: NavController,
    private storage: Storage,
    private service: AuthService,
    private message: MessageService
  ) {
  }

  async ngOnInit() {
    await this.storage.create();
  }

  login() {
    if (this.dados.login == "") {
      this.message.toastError('Informe seu CPF!');
      return;
    }
    if (this.dados.password == "") {
      this.message.toastError('Informe sua senha!');
      return;
    }

    this.message.load_present();
    this.service.login(this.dados).then((res) => {
      console.log(res);
      this.setSession(res);
    }).finally(() => this.message.load_dismiss());
  }

  setSession(res) {
    this.storage.set(`sessionSawber`, res).then(() => {
      console.log('sessionSawber');
      localStorage.setItem(environment.authTokenKey, res.access_token);
      this.appService.passValue('sessionStart');

      this.navCtrl.navigateRoot('/home');
    });

  }

}
