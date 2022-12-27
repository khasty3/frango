import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ColetaService } from 'src/app/services/coleta.service';
import { MessageService } from 'src/app/services/message.service';
import { ColetaMedicoItemFormPage } from '../coleta-medico-item-form/coleta-medico-item-form.page';

@Component({
  selector: 'app-coleta-medico-form',
  templateUrl: './coleta-medico-form.page.html',
  styleUrls: ['./coleta-medico-form.page.scss'],
})
export class ColetaMedicoFormPage implements OnInit {

  medico: any = { itens: [] };

  @Input() data: any;
  @Input() coleta_id: any;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private service: ColetaService,
    private message: MessageService
  ) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data) {
      this.medico = this.data;
      this.medico.itens = this.data.itens ? this.data.itens : [];
    }
  }

  closeModal(params = undefined) {
    // if (this.dados.itens.length > 0) {
    //   return this.alertVoltar();
    // }

    this.modalCtrl.dismiss(params);
  }

  async alertVoltar() {
    // const alert = await this.alertCtrl.create({
    //   cssClass: 'my-custom-class',
    //   header: 'Atenção!',
    //   mode: 'ios',
    //   message: 'Se você sair pode perder toda a coleta do médico.',
    //   buttons: [
    //     {
    //       text: 'Voltar',
    //       cssClass: 'secondary'
    //     }, {
    //       text: 'Confirmar',
    //       handler: () => {
    this.modalCtrl.dismiss(undefined);
    //       }
    //     }
    //   ]
    // });

    // await alert.present();
  }

  async addItem() {
    const modal = await this.modalCtrl.create({
      component: ColetaMedicoItemFormPage,
      componentProps: { medico: this.medico, coleta_id: this.coleta_id }
    });

    await modal.present();
    modal.onDidDismiss().then(res => {
      console.log(res);
      if (res.data) {
        this.medico.itens.push(res.data);
      }
    })
  }

  async confirmRemove(item, i) {
    let message = `Deseja remover a ocorrência: <b>${item.description}</b> ?`;
    if (item.tipo_id) {
      message = `Deseja remover o item: <b>${item.tipo_exame.nome}</b> ?`;
    }
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      mode: 'ios',
      message: message,
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.message.load_present();
            this.service.removeItemColeta(item.uuid).then(() => {
              this.medico.itens.splice(i, 1);
            }).finally(() => this.message.load_dismiss());
          }
        }
      ]
    });

    await alert.present();
  }

}
