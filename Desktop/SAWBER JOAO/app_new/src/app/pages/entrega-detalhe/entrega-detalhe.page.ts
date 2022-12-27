import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { EntregaService } from 'src/app/services/entrega.service';
import { MessageService } from 'src/app/services/message.service';
import { ModalSignatureComponent } from '../shared/modal-signature/modal-signature.component';

@Component({
  selector: 'app-entrega-detalhe',
  templateUrl: './entrega-detalhe.page.html',
  styleUrls: ['./entrega-detalhe.page.scss'],
})
export class EntregaDetalhePage implements OnInit {

  dados: any = { exame: {}, pendencias: [] };

  reportData: any = {};

  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private routerActive: ActivatedRoute,
    private service: EntregaService,
    private message: MessageService,
    private cameraService: CameraService
  ) { }

  ngOnInit() {
    this.routerActive.params.subscribe(params => {
      console.log(params);
      if (params.entrega_id) {

        this.dados.entrega_id = params.entrega_id;

        this.getDados(params.entrega_id)
      }
    }).unsubscribe();
  }

  async doRefresh(event) {
    await this.getDados(this.dados.uuid);
    event.target.complete();
  }

  getDados(id) {
    this.message.load_present();
    this.service.getById(id).then((res) => {
      this.dados = res;
    }).finally(() => this.message.load_dismiss());
  }

  getAddress() {
    let label = '';
    if (this.dados.exame) {
      const exame = this.dados.exame;
      // label = `${exame.exame_endereco}, ${exame.exame_complemento}, ${exame.exame_bairro} - ${exame.exame_cidade}/${exame.exame_estado}`;
      label = `${exame.logradouro}, ${exame.complemento}, ${exame.bairro} - ${exame.cidade}/${exame.uf}`;
    }
    return label;
  }


  async getPhoto() {
    let image: any = await this.cameraService.takePhoto();
    if (image.base64String) {
      this.dados.foto = `data:image/jpeg;base64,${image.base64String}`;
      // this.confirm();
    }
  }
  async getSignature() {
    const modal = await this.modalCtrl.create({
      component: ModalSignatureComponent
    });

    await modal.present();
    modal.onDidDismiss().then(res => {
      console.log(res);
      if (res.data) {
        this.dados.signature = res.data;
        // this.medico.itens.push(res.data);
      }
    })
  }

  async getInfo() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      // header: 'Prompt!',
      message: 'Informe os dados da entrega.',
      backdropDismiss: false,
      mode: 'ios',
      inputs: [
        {
          name: 'recptor',
          type: 'text',
          placeholder: 'Nome de quem recebeu.'
        },
        {
          name: 'doc',
          type: 'text',
          placeholder: 'Documento de quem recebeu.'
        }
      ],
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: (data) => {
            if (data.recptor == "") {
              return this.message.toastError('Informe o Nome...');
            }
            this.dados.recptor = data.recptor;

            if (data.doc == "") {
              return this.message.toastError('Informe o Documento...');
            }
            this.dados.doc = data.doc;

            // this.getPhoto();
            this.getSignature();

          }
        }
      ]
    });

    await alert.present();
  }


  confirm() {

    if (!this.dados.recptor || !this.dados.doc) {
      return this.getInfo();
    }

    // if (!this.dados.foto) {
    //   this.getPhoto();
    //   return;
    // }
    if (!this.dados.signature) {
      this.getSignature();
      return;
    }

    this.message.load_present();
    this.service.update(this.dados.uuid, this.dados).then(() => {
      // this.getDados(this.dados.uuid);
      this.navCtrl.pop();
    }).finally(() => this.message.load_dismiss());
  }


  async openReport() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-alert-full',
      // header: 'Prompt!',
      message: 'Informe o motivo da ocorrência.',
      backdropDismiss: false,
      mode: 'ios',
      inputs: [
        {
          name: 'description',
          type: 'textarea',
          placeholder: 'Descreva o motivo.',
          value: `${this.reportData.description ?? ''}`,
          attributes: {
            rows: 6
          }
        }
      ],
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary'
        },
        {
          text: 'Sem Foto',
          handler: (data) => {
            if (data.description == "") {
              return this.message.toastError('Informe a descrição...');
            }

            this.reportData.entrega_id = this.dados.uuid;
            this.reportData.portador_id = this.dados.portador_id;
            this.reportData.description = data.description;

            this.reporte();
          }
        },
        {
          text: 'Com Foto',
          handler: async (data) => {
            if (data.description == "") {
              return this.message.toastError('Informe a descrição...');
            }

            this.reportData.entrega_id = this.dados.uuid;
            this.reportData.portador_id = this.dados.portador_id;
            this.reportData.description = data.description;

            let image: any = await this.cameraService.takePhoto();
            if (image.base64String) {
              this.reportData.foto = `data:image/jpeg;base64,${image.base64String}`;
              this.reporte();
            }
          }
        }
      ]
    });

    await alert.present();
  }

  reporte() {
    this.message.load_present();
    this.service.createReport(this.reportData).then(() => {
      // this.getDados(this.dados.uuid);
      this.navCtrl.pop();
    }).finally(() => this.message.load_dismiss());
  }

}
