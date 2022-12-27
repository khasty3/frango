import { Component, OnInit } from '@angular/core';
import { ActionSheetController, AlertController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { EntregaService } from 'src/app/services/entrega.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-entregas',
  templateUrl: './entregas.page.html',
  styleUrls: ['./entregas.page.scss'],
})
export class EntregasPage implements OnInit {

  user: any = {};

  entregas = [];

  code = '';

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private authService: AuthService,
    private service: EntregaService,
    private message: MessageService
  ) {
    this.storage.create();
  }

  ngOnInit() {
  }

  async doRefresh(event) {
    await this.getListing();
    event.target.complete();
  }

  async ionViewWillEnter() {
    const session = await this.authService.getSession();
    console.log(session);
    this.user = session.user;

    this.getListing();
  }

  getListing() {
    this.message.load_present();
    this.service.listing({ portador_id: this.user.uuid }).then((res) => {
      this.entregas = res;
    }).finally(() => this.message.load_dismiss());
  }

  getAddress(entrega) {
    let label = '';
    if (entrega.exame) {
      const exame = entrega.exame;
      label = `${exame.logradouro}, ${exame.complemento}, ${exame.bairro} - ${exame.cidade}/${exame.uf}`;
      // label = `${exame.exame_endereco}, ${exame.exame_complemento}, ${exame.exame_bairro} - ${exame.exame_cidade}/${exame.exame_estado}`;
    }
    return label;
  }

  async openOptions() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Adicionar Entrega',
      cssClass: 'my-custom-class',
      mode: 'ios',
      buttons: [
        {
          text: 'Ler QR Code',
          icon: 'qr-code',
          handler: () => {
            this.startQrCodeScan()
          }
        }, {
          text: 'Manual',
          icon: 'create',
          handler: () => {
            this.codeQRManual()
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async getEntrega() {
    const code = await this.message.readQRCode();
    if (code != false) {
      this.message.load_present();
      this.service.getByCode(this.user.uuid, { code: code} ).then((res) => {
        // console.log(res);
        this.message.load_dismiss()
        this.navCtrl.navigateForward(`/entrega-detalhe/${res.uuid}`);
        // this.getListing();
      }).catch(() => this.message.load_dismiss());
    }
  }

  async startQrCodeScan() {
    const code = await this.message.readQRCode();
    if (code != false) {
      this.entregaForm(code);
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
            this.entregaForm(data.code);
          }
        }
      ]
    });

    await alert.present();
  }

  entregaForm(code) {
    const dados = {
      portador_id: this.user.uuid,
      exame_id: code
    }

    this.message.load_present();
    this.service.create(code, dados).then((res) => {
      // console.log(res);
      // this.navCtrl.navigateForward(`/entrega-form/${res.exame_id}`);
      this.message.load_dismiss();
      this.getListing();
    }).catch(() => this.message.load_dismiss());
  }

  searchCode() {
    this.message.load_present();
    this.service.getByCode(this.user.uuid, { code: this.code }).then((res) => {
      // console.log(res);
      this.message.load_dismiss()
      this.navCtrl.navigateForward(`/entrega-detalhe/${res.uuid}`);
      // this.getListing();
    }).catch(() => this.message.load_dismiss());
  }

}
