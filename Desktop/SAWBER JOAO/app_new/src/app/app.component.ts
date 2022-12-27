import { Component } from '@angular/core';
import { ModalController, NavController, Platform } from '@ionic/angular';

// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
import { AuthService } from './services/auth.service';
import { Storage } from '@ionic/storage';
import { MessageService } from './services/message.service';
import { ColetaService } from './services/coleta.service';

// import OneSignal from 'onesignal-cordova-plugin';
import { AppService } from './services/app.service';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [];

  notifications = [];

  intervalColetas = null;
  sending = false;
  coletas = [];

  user: any = {};

  constructor(
    private modalCtrl: ModalController,
    private storage: Storage,
    private platform: Platform,
    // private statusBar: StatusBar,
    // private splashScreen: SplashScreen,
    private authService: AuthService,
    private coletaService: ColetaService,
    private message: MessageService,
    private navCtrl: NavController,
    private oneSignal: OneSignal,
    private appService: AppService,
    private geolocation: Geolocation,

    // private notificationService: NotificationService,
  ) {


    // console.log('app component');
    this.initializeApp();

    this.appService.loginObserver.subscribe((data) => {
      console.log('appService', data);
      if (data == "sessionStart") {
        this.getUser();
      }
    });
  }

  initializeApp() {

    // this.platform.ready().then(() => {
    // this.statusBar.overlaysWebView(false);
    // this.statusBar.backgroundColorByHexString('#e46e06');

    console.log(this.platform.platforms());
    if (!this.platform.is('mobileweb') && this.platform.is('mobile')) {
      this.startOnSignal();
    }

    this.getUser();
    // this.getColetas();
    // this.setIntervalColetas();

    // this.splashScreen.hide();
    // });
  }

  async getUser() {
    const session = await this.authService.getSession();
    //console.log('session', session);
    if (session) {
      this.user = session.user;
if(session != null){
      setInterval(() => {
        this.geolocation.getCurrentPosition().then((resp) => {
          console.log(resp.coords.latitude)
          console.log(resp.coords.longitude)
          this.user.longitude = resp.coords.longitude;
          this.user.latitude = resp.coords.latitude;
          this.authService.updateUser( this.user, this.user.uuid).then(() => {
           // console.log('addOneSignalID success');
          });
         }).catch((error) => {
           console.log('Error getting location', error);
         });
      }, 40000);
    }
      if (session.user.tipo == 0) {
        this.appPages = [
          { title: 'Início', url: '/home', icon: 'mail' },
          { title: 'Roteiros', url: '/roteiros', icon: 'mail', },
          // { title: 'Envios Pendentes', url: '/coletas-pending', icon: 'mail', },
          { title: 'Relatório Malotes', url: '/malote-report', icon: 'mail', },
          { title: 'Relatório Entregas', url: '/entrega-report', icon: 'mail', },
        ];

        // this.getNotifications({ portador_id: this.user.uuid });
      } else {
        this.appPages = [
          { title: 'Início', url: '/home', icon: 'mail' }
        ]
      }

      this.addOneSignalID()
    }


  }

  getColetas() {
    this.storage.get('coletas').then(res => {
      console.log('coletas', res);
      if (res && res != null) { //temos coletas
        this.coletas = res;
      }

    }).catch(err => {
      this.message.toastError('Falha ao verificar coletas no dispositivo.');
      console.log(err);
    })
  }

  setIntervalColetas() {
    this.intervalColetas = setInterval(() => {
      if (this.sending == false) {
        this.sendColetas();
      } else {
        console.log('sending', this.sending);
      }
    }, 5000);
  }

  async sendColetas() {
    this.sending = true;
    console.log('sendColetas');

    if (this.coletas.length == 0) {
      setTimeout(() => {
        this.getColetas();
        this.sending = false;
      }, 30000);
      return;
    }

    for (let i = 0; i < this.coletas.length; i++) {
      await this.coletaService.createColeta(this.coletas[i]).then(res => {
        // this.coletas[i].cStatus = 10;
        this.coletas.splice(i, 1);
      }).catch(err => {
        // this.coletas[i].cStatus = 0;
        this.coletas[i].status = err.error.message;
      });
    }

    console.log(this.coletas);
    this.storage.set('coletas', this.coletas).then(() => {
      // this.navCtrl.navigateRoot('/home');
      this.sending = false;
    }).catch(err => {
      console.log('Falha ao atualizar coletas no dispositivo. ', err);
    });

    // setTimeout(() => {
    //   this.sending = false;
    // }, 12000);
  }

  async logout() {
    await this.storage.remove('sessionSawber');
    await this.storage.remove('nameAuditor')
    this.navCtrl.navigateRoot('/auth');
  }

  startOnSignal() {
    console.log('startOnSignal');
    this.oneSignal.startInit('6594fac1-f555-4f3c-8bec-33dc561fc423', '114897601718');

    this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);

    this.oneSignal.handleNotificationReceived().subscribe((jsonData) => {
      // do something when notification is received
      console.log('handleNotificationReceived', jsonData);
      // let dados = jsonData.payload.additionalData;
      // if (dados) {
      //   if (dados.solicitacao && dados.solicitacao.prioridade == 'URGENTE') {
      //     this.openModalConfirme(dados);
      //   }
      //   if (dados.devolucao && dados.devolucao.prioridade == 'URGENTE') {
      //     this.openModalConfirme(dados);
      //   }
      // }
    });

    this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
      // do something when a notification is opened
      console.log('handleNotificationOpened', jsonData);
      let dados = jsonData.notification.payload.additionalData;
      if (dados) {
        if (dados.solicitacao && dados.solicitacao.prioridade == 'URGENTE') {
          this.message.openModalConfirme(dados);
        }
        if (dados.devolucao && dados.devolucao.prioridade == 'URGENTE') {
          this.message.openModalConfirme(dados);
        }
      }
    });

    this.oneSignal.endInit();

    // NOTE: Update the setAppId value below with your OneSignal AppId.
    // OneSignal.setAppId("6594fac1-f555-4f3c-8bec-33dc561fc423");
    // OneSignal.setNotificationOpenedHandler((jsonData) => {
    //   console.log('notificationOpenedCallback: ', jsonData);

    //   if (jsonData.notification.additionalData) {
    //     let data: any = jsonData.notification.additionalData;
    //     if (data.solicitacao && data.solicitacao.prioridade == 'URGENTE') {
    //       this.openModalConfirme(data);
    //     }
    //     if (data.devolucao && data.devolucao.prioridade == 'URGENTE') {
    //       this.openModalConfirme(data);
    //     }
    //   }

    // });

    // // iOS - Prompts the user for notification permissions.
    // //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
    // OneSignal.promptForPushNotificationsWithUserResponse((accepted) => {
    //   console.log("User accepted notifications: ", accepted);
    // });
  }

  addOneSignalID() {
    if (this.platform.is('mobileweb') || !this.platform.is('mobile')) {
      return
    }
    this.oneSignal.getIds().then(res => {
      console.log('addOneSignalID', res);
      this.authService.updateUser({ one_signal_id: res.userId }, this.user.uuid).then(() => {
        console.log('addOneSignalID success');
      });
    });

    // OneSignal.getDeviceState(res => {
    //   console.log('addOneSignalID', res);
    //   this.authService.updateUser({ one_signal_id: res.userId }, this.user.uuid).then(() => {
    //     console.log('addOneSignalID success');
    //   });
    // })
  }

}
