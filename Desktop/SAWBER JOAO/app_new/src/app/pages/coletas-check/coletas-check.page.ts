import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { ModalMotoboyPage } from 'src/app/pages/shared/modal-motoboy/modal-motoboy.page';
import { MessageService } from 'src/app/services/message.service';
import { MotoboyService } from 'src/app/services/motoboy.service';

@Component({
  selector: 'app-coletas-check',
  templateUrl: './coletas-check.page.html',
  styleUrls: ['./coletas-check.page.scss'],
})
export class ColetasCheckPage implements OnInit {

  portador: any = {};
  coletas = [];

  constructor(
    private alertCtrl: AlertController,
    private actionSheetController: ActionSheetController,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private service: MotoboyService,
    private message: MessageService
  ) { }

  ngOnInit() {
  }

  async doRefresh(event) {
    await this.getColetas();
    event.target.complete();

  }

  ionViewWillEnter() {
    this.getColetas();
  }

  async searchPortador() {
    const modal = await this.modalCtrl.create({
      component: ModalMotoboyPage,
      componentProps: {
        // roteiro: true
      }
    });
    await modal.present();

    modal.onDidDismiss().then(res => {
      console.log(res);
      if (res.data) {
        this.portador = res.data;
        this.getColetas();
      }
    });
  }

  async getColetas() {
    if (!this.portador.uuid) {
      return;
    }
    this.message.load_present();
    await this.service.getColetas({ portador_id: this.portador.uuid }).then(res => {
      this.coletas = res;
    }).finally(() => this.message.load_dismiss());
  }

  async optionSearch() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Buscar Coleta',
      // cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [
        {
          text: 'Manual',
          icon: 'create-outline',
          handler: () => {
            // console.log('Share clicked');
            this.codeQRManual();
          }
        }, {
          text: 'Ler QR Code',
          icon: 'qr-code-outline',
          handler: async () => {
            const code = await this.message.readQRCode();
            if (code != false) {
              this.getColeta(code);
            }
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async codeQRManual() {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      // header: 'Prompt!',
      message: 'Informe o código do QR Code manualmente.',
      backdropDismiss: false,
      mode: 'ios',
      inputs: [
        {
          name: 'code',
          type: 'text',
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
            this.getColeta(data.code);
          }
        }
      ]
    });

    await alert.present();
  }

  getColeta(code) {
    this.message.load_present();
    this.service.getColeta(code).then((res) => {
      // console.log(res);
      this.message.load_dismiss()
      this.navCtrl.navigateForward('/coletas-check-detail/' + res.uuid);
      // this.getListing();
    }).catch(() => this.message.load_dismiss());
  }

}
