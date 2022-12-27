import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { ColetaService } from 'src/app/services/coleta.service';
import { MessageService } from 'src/app/services/message.service';
import { ModalClinicasComponent } from '../shared/modal-clinicas/modal-clinicas.component';

import { Storage } from '@ionic/storage';


@Component({
  selector: 'app-coleta',
  templateUrl: './coleta.page.html',
  styleUrls: ['./coleta.page.scss'],
})
export class ColetaPage implements OnInit {

  user: any = {};
  clinica: any = {};
  dados: any = {};

  filterSolicitacoes: any = { status: 'AGUARDANDO_PORTADOR' };

  solicitacoes: any[] = [];
  devolucoes: any[] = [];

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private authService: AuthService,
    private service: ColetaService,
    private message: MessageService
  ) {
    this.storage.create();
  }

  async ngOnInit() {
    const session = await this.authService.getSession();
    console.log(session);
    console.log('funcionando?');
    this.user = session.user;
    this.filterSolicitacoes.portador_id = this.user.uuid;

    // this.getSolicitacoes();
  }

  ionViewDidEnter() {
    this.getSolicitacoes();
  }

  async searchClinicas() {
    const modal = await this.modalCtrl.create({
      component: ModalClinicasComponent,
      componentProps: {
        roteiro: true
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
    this.service.createColeta({ code_qr: code, clinica_id: this.clinica.uuid }).then((res) => {
      this.navCtrl.navigateForward(`/coleta-form/${res.data.uuid}`);
    }).finally(() => this.message.load_dismiss());
  }

  async coletaEmpty() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      mode: 'ios',
      message: `Visita sem coleta ?`,
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.dados = { portador_id: this.user.uuid, clinica_id: this.clinica.uuid, clinica: this.clinica.description, sem_coleta: 1 };

            this.message.load_present();
            this.service.createColeta(this.dados).then(() => {
              this.navCtrl.navigateRoot('/home');
            }).catch(err => {
              this.storageColeta();
            }).finally(() => this.message.load_dismiss());
          }
        }
      ]
    });

    await alert.present();
  }

  async storageColeta() {

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Aviso!',
      mode: 'ios',
      message: 'Sua coleta foi armazenada no dispositivo por falta de internet... \n Será enviado quando a mesma for restaurada.',
      buttons: ['OK']
    });

    await alert.present();

    this.storage.get('coletas').then(res => {

      if (res && res != null) { //temos coletas
        let coletas = res;
        coletas.push(this.dados);
        this.setColetas(coletas);
      } else { //sem coletas
        let coletas = [];
        coletas.push(this.dados);
        this.setColetas(coletas);
      }

    }).catch(err => {
      this.message.toastError('Falha ao verificar coletas no dispositivo.');
      console.log(err);
    })

  }

  setColetas(coletas) {
    this.storage.set('coletas', coletas).then(() => {
      this.navCtrl.navigateRoot('/home');
    }).catch(err => {
      this.message.toastError('Falha ao salvar coleta no dispositivo.');
      console.log(err);
    });
  }


  async getSolicitacoes() {
    this.message.load_present();
    await this.service.getSolicitacoes(this.filterSolicitacoes).then(res => {
      this.solicitacoes = res;
    }).finally(() => this.message.load_dismiss());
    this.getDevolucoes();
  }
  
   getDevolucoes() {
    this.message.load_present();
     this.service.getDevolucoes(this.filterSolicitacoes).then(res => {
      this.devolucoes = res;
    }).finally(() => this.message.load_dismiss());
  }
}
