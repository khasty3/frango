import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { MaloteService } from 'src/app/services/malote.service';
import { MessageService } from 'src/app/services/message.service';
import { ModalClinicasComponent } from '../shared/modal-clinicas/modal-clinicas.component';

@Component({
  selector: 'app-malotes',
  templateUrl: './malotes.page.html',
  styleUrls: ['./malotes.page.scss'],
})
export class MalotesPage implements OnInit {

  user: any = {};
  clinica: any = {};
  dados: any = {};

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private authService: AuthService,
    private service: MaloteService,
    private message: MessageService
  ) {
    this.storage.create();
  }

  async ngOnInit() {
    const session = await this.authService.getSession();
    console.log(session);
    this.user = session.user;
  }

  async searchClinicas() {
    const modal = await this.modalCtrl.create({
      component: ModalClinicasComponent,
      componentProps: {
        // roteiro: true
      }
    });
    await modal.present();

    modal.onDidDismiss().then(res => {
      console.log(res);
      if (res.data) {
        this.clinica = res.data;
      }
    })
  }

  async startQrCodeScan() {
    const code = await this.message.readQRCode();
    if (code != false) {
      this.coletaForm(code);
    }
  }

  async codeQRManual() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      // header: 'Prompt!',
      message: 'Informe o código do QR Code manualmente.',
      backdropDismiss: false,
      mode: 'ios',
      inputs: [
        {
          name: 'code',
          type: 'tel',
          placeholder: 'Informe o código do QR Code.'
        }
      ],
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: (data) => {
            if (data.code == "") {
              return this.message.toastError('Informe o código...');
            }
            this.coletaForm(data.code);
          }
        }
      ]
    });

    await alert.present();
  }

  coletaForm(code) {
    this.message.load_present();
    this.service.checkColetaCode(code).then(() => {

      this.navCtrl.navigateForward(`/malote-form/${this.clinica.uuid}/${code}`);

    }).finally(() => this.message.load_dismiss());
  }

}
