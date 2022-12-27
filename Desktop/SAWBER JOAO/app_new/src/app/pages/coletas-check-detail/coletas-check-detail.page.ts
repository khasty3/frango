import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  AlertController,
  ModalController,
  NavController,
} from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { MessageService } from 'src/app/services/message.service';
import { MotoboyService } from 'src/app/services/motoboy.service';
import { ColetasCheckItemPage } from '../coletas-check-item/coletas-check-item.page';

@Component({
  selector: 'app-coletas-check-detail',
  templateUrl: './coletas-check-detail.page.html',
  styleUrls: ['./coletas-check-detail.page.scss'],
})
export class ColetasCheckDetailPage implements OnInit {
  coleta: any = { clinica: {}, medicos: [], warning: { itens: [] } };
  auditor: string;

  constructor(
    private storage: Storage,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private routerActive: ActivatedRoute,
    private service: MotoboyService,
    private message: MessageService
  ) {
    this.storage.create();
  }

  async ngOnInit() {
    this.routerActive.params
      .subscribe((params) => {
        console.log(params);
        if (params.coleta_id) {
          this.getDados(params.coleta_id);
        }
      })
      .unsubscribe();

    // this.auditor = await this.storage.get('nameAuditor');
    this.auditor = sessionStorage.getItem('nameAuditor');
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
            this.navCtrl.pop();
          },
        },
        {
          text: 'Confirmar',
          handler: (data) => {
            if (data.nome == '') {
              this.getNomeAuditor();
              return this.message.toastError('Informe o código...');
            }

            // this.coleta.auditor = data.nome;
          },
        },
      ],
    });

    await alert.present();
  }

  getDados(uuid) {
    this.message.load_present();
    this.service
      .getColeta(uuid)
      .then(async (res) => {
        this.coleta = res;
        if (this.coleta.status != 10) {
          // this.getNomeAuditor();
          this.coleta.medicos.forEach(async (medico) => {
            medico.itens.forEach(async (item) => {
              item.auditor = this.auditor;
            });
          });
          // this.coleta.auditor = await this.storage.get('nameAuditor')
        }

        console.log(this.coleta);
      })
      .finally(() => this.message.load_dismiss());
  }

  async openItens(item = undefined) {
    const modal = await this.modalCtrl.create({
      component: ColetasCheckItemPage,
      componentProps: {
        data: item,
        auditor: this.coleta.auditor,
      },
    });
    await modal.present();

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.getDados(this.coleta.uuid);
      }
    });
  }

  getItensTotal() {
    let total = 0;
    this.coleta.medicos.forEach((medico) => {
      if (medico.itens) {
        total += medico.itens.length;
      }
    });

    return total;
  }

  checkOccurrence() {
    let find = false;
    for (let medico of this.coleta.medicos) {
      for (let item of medico.itens) {
        if (item.status == 5) {
          find = true;
        }
      }
    }

    return find;
  }

  checkSuccess() {
    let find = true;
    for (let medico of this.coleta.medicos) {
      for (let item of medico.itens) {
        // if (item.status == 5 || item.status == 1) {
        if (item.status == 5) {
          find = false;
        }
      }
    }

    return find;
  }

  async setColetaSuccess() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Atenção!',
      message: 'Tudo certo com esta coleta ?',
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary',
        },
        {
          text: 'Sim',
          handler: () => {
            this.updateColetaStatus({ status: 10, auditor: this.auditor });
          },
        },
      ],
    });

    await alert.present();
  }

  async setColetaOccurrence() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      mode: 'ios',
      header: 'Atenção!',
      message: 'Gerar ocorrência para esta coleta ?',
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary',
        },
        {
          text: 'Sim',
          handler: () => {
            this.updateColetaStatus({ status: 5, auditor: this.auditor });
          },
        },
      ],
    });

    await alert.present();
  }

  updateColetaStatus(dados) {
    this.message.load_present();
    this.service
      .updateColeta(this.coleta.uuid, dados)
      .then((res) => {
        // this.getDados(this.coleta.uuid);
        this.navCtrl.pop();
      })
      .finally(() => this.message.load_dismiss());
  }
}
