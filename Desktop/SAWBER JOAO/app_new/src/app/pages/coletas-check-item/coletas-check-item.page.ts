import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MessageService } from 'src/app/services/message.service';
import { MotoboyService } from 'src/app/services/motoboy.service';

@Component({
  selector: 'app-coletas-check-item',
  templateUrl: './coletas-check-item.page.html',
  styleUrls: ['./coletas-check-item.page.scss'],
})
export class ColetasCheckItemPage implements OnInit {

  dados: any = { itens: [] };

  changes = undefined;

  @Input() data: any;
  @Input() auditor: string;

  constructor(
    private ref: ChangeDetectorRef,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private service: MotoboyService,
    private message: MessageService
  ) { }

  ngOnInit() {
    console.log(this.data);
    if (this.data) {
      this.dados = this.data;
    }
  }

  close(params) {
    this.modalCtrl.dismiss(params);
  }

  async checkSuccess(item, index) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Atenção!',
      message: 'Tudo certo com este item ?',
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary'
        }, {
          text: 'Sim',
          handler: () => {
            this.updateItem(item, index, { status: 10, auditor: this.auditor });
          }
        }
      ]
    });

    await alert.present();
  }

  updateItem(item, index, dados) {
    this.message.load_present();
    this.service.updateItem(item.uuid, dados).then(res => {
      console.log('item', res);
      this.dados.itens[index] = res;
      // this.ref.detectChanges();
      this.changes = true;
    }).finally(() => this.message.load_dismiss());
  }

  async genOcorrencia(item, index) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-alert-full',
      mode: 'ios',
      header: 'Ocorrência',
      inputs: [
        {
          name: 'description',
          type: 'textarea',
          attributes: {
            rows: 5
          },
          placeholder: 'Informe a ocorrência.'
        }
      ],
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary'
        }, {
          text: 'Confirme',
          handler: (data) => {
            if (data.description == "") {
              return this.message.toastError('Informe a ocorrência');
            }
            this.updateItem(item, index, { status: 5, description: data.description });
          }
        }
      ]
    });

    await alert.present();
  }

}
