import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  coletas = [];
  user: any = {};

  notifications = [];

  nowBuild = '2.0.0';

  constructor(
    private alertCtrl: AlertController,
    private storage: Storage,
    private authService: AuthService,
    private message: MessageService,
    private notificationService: NotificationService
  ) {
    this.storage.create();
  }

  ngOnInit() {
    this.getUser();
  }

  async getNomeAuditor() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      // header: 'Prompt!',
      message: 'Informe seu nome.',
      backdropDismiss: false,
      mode: 'ios',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          // placeholder: 'Informe o código do QR Code.'
        },
      ],
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary',
          handler: () => {
            // this.navCtrl.pop();
            this.getNomeAuditor();
          },
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            if (data.nome == '') {
              this.getNomeAuditor();
              return this.message.toastError('Informe seu NOME...');
            }

            // this.coleta.auditor = data.nome;
            sessionStorage.setItem('nameAuditor', data.nome);
            // this.storage.set('nameAuditor', data.nome);
          },
        },
      ],
    });

    await alert.present();
  }

  async getUser() {
    const session = await this.authService.getSession();
    this.user = session.user;
    if (this.user.tipo == 1) {
      const nameAuditor = sessionStorage.getItem('nameAuditor');
      // const nameAuditor = await this.storage.get('nameAuditor');
      if (!nameAuditor) {
        this.getNomeAuditor();
      }
    }
    this.getNotifications({ portador_id: this.user.uuid });
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter');
    this.getColetas();
  }

  getColetas() {
    this.storage
      .get('coletas')
      .then((res) => {
        console.log('coletas', res);
        if (res && res != null) {
          //temos coletas
          this.coletas = res;
        }
      })
      .catch((err) => {
        this.message.toastError('Falha ao verificar coletas no dispositivo.');
        console.log(err);
      });
  }

  getNotifications(dados) {
    this.notificationService.getListing(dados).then((res) => {
      this.notifications = res;
    });
  }
}
