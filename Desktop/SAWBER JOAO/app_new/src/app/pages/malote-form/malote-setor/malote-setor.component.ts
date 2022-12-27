import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MaloteItemComponent } from '../malote-item/malote-item.component';

@Component({
  selector: 'app-malote-setor',
  templateUrl: './malote-setor.component.html',
  styleUrls: ['./malote-setor.component.scss'],
})
export class MaloteSetorComponent implements OnInit {

  dados: any = { itens: [] };

  @Input() data: any;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    // private service: ColetaService,
    // private message: MessageService
  ) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data) {
      this.dados = this.data;
      this.dados.itens = this.data.itens ? this.data.itens : [];
    }
  }

  close(params = undefined) {
    if (this.dados.itens.length > 0) {
      return this.alertVoltar();
    }

    this.modalCtrl.dismiss(params);
  }

  save(params) {
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
      component: MaloteItemComponent
    });

    await modal.present();
    modal.onDidDismiss().then(res => {
      console.log(res);
      if (res.data) {
        this.dados.itens.push(res.data);
      }
    })
  }

  async confirmRemove(item, i) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      mode: 'ios',
      message: `Deseja remover o item ?`,
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.dados.itens.splice(i, 1);
          }
        }
      ]
    });

    await alert.present();
  }

}
