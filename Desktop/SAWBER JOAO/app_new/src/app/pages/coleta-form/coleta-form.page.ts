import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { ColetaService } from 'src/app/services/coleta.service';
import { MedicoService } from 'src/app/services/medico.service';
import { MessageService } from 'src/app/services/message.service';
import { environment } from 'src/environments/environment';
import { ColetaMedicoFormPage } from '../coleta-medico-form/coleta-medico-form.page';
import { ModalMedicosPage } from '../shared/modal-medicos/modal-medicos.page';

@Component({
  selector: 'app-coleta-form',
  templateUrl: './coleta-form.page.html',
  styleUrls: ['./coleta-form.page.scss'],
})
export class ColetaFormPage implements OnInit {

  clinica: any = {};
  dados: any = { clinica: {}, medicos: [], warning: { itens: [] } };
  solicitacao: any = {};

  user: any = {};

  constructor(
    private navCtrl: NavController,
    private routerActive: ActivatedRoute,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private storage: Storage,
    private medicoService: MedicoService,
    private authService: AuthService,
    private service: ColetaService,
    private message: MessageService,
  ) {
    this.storage.create();
  }

  async ngOnInit() {
    // this.backgroundMode.enable();
    // this.backgroundMode.on("activate").subscribe(() => {
    //   this.backgroundMode.disableWebViewOptimizations();
    //   this.backgroundMode.disableBatteryOptimizations();
    //   console.log("background activate !!!!");
    // });
    // setTimeout(() => {
    //   this.backgroundMode.disable();
    // }, 5000);
    const session = await this.authService.getSession();
    this.user = session.user;
    this.dados.portador_id = this.user.uuid;

    this.routerActive.params.subscribe(params => {
      console.log(params);
      if (params.coleta_id) {
        this.getColeta(params.coleta_id);
      }
    }).unsubscribe();
    this.routerActive.queryParams.subscribe(res => {
      if (res.solicitacao_id) {
        this.getDadosSolicitacao(res.solicitacao_id);
      }
    }).unsubscribe();
  }

  getColeta(id) {
    this.message.load_present();
    this.service.getColeta(id).then(async (res) => {
      this.dados = res.data;
      await this.getDadosClinica(this.dados.clinica_id);
      // this.getColetaTempStorage(this.dados.code_qr);
    }).finally(() => this.message.load_dismiss());
  }

  async getDadosClinica(id) {
    await this.service.getClinica(id).then(async (res) => {
      this.clinica = res;
    });
  }

  getDadosSolicitacao(id) {
    this.service.getSolicitacao(id).then(res => {
      this.solicitacao = res;
      this.dados.solicitacao_id = res.uuid;
    });
  }

  // getColetaTempStorage(code_qr) {
  //   console.log('getColetaTempStorage');
  //   let coletasTempList: any[] = [];
  //   this.storage.get(environment.coletasTemp).then((coletasTemp: any[]) => {
  //     if (coletasTemp) {//se existir recebe os dados
  //       coletasTempList = coletasTemp;
  //     }

  //     let findIndexColeta = coletasTempList.findIndex(coleta => coleta.code_qr == code_qr);
  //     if (findIndexColeta >= 0) {
  //       this.dados = coletasTempList[findIndexColeta];
  //     } else {
  //       coletasTempList.push(this.dados);
  //       this.storage.set(environment.coletasTemp, coletasTempList);
  //     }
  //   });
  // }

  // updateColetaTempStorage(code_qr) {
  //   console.log('updateColetaTempStorage');
  //   let coletasTempList: any[] = [];
  //   this.storage.get(environment.coletasTemp).then((coletasTemp: any[]) => {
  //     if (coletasTemp) {//se existir recebe os dados
  //       coletasTempList = coletasTemp;
  //     }

  //     let findIndexColeta = coletasTempList.findIndex(coleta => coleta.code_qr == code_qr);
  //     if (findIndexColeta >= 0) {
  //       coletasTempList[findIndexColeta] = this.dados;
  //     } else {
  //       coletasTempList.push(this.dados);
  //     }
  //     this.storage.set(environment.coletasTemp, coletasTempList);
  //   });
  // }

  usedMedical(medico) {
    let show = true;
    for (let item of this.dados.medicos) {
      if (item.uuid == medico.uuid) {
        show = false;
      }
    }

    return show;
  }

  async openColeta(item = undefined, i = undefined) {
    const modal = await this.modalCtrl.create({
      component: ColetaMedicoFormPage,
      componentProps: {
        'data': item,
        'coleta_id': this.dados.uuid
      }
    });

    await modal.present();
    modal.onDidDismiss().then(res => {
      console.log(res);
      if (res.data) {
        this.getColeta(this.dados.uuid);
        // if (item && item.uuid) {
        //   if (i >= 0) {
        //     this.dados.medicos[i] = res.data;
        //   } else {
        //     this.dados.medicos.push(res.data);
        //   }
        // } else {//ocorrências
        //   if (i >= 0) {
        //     this.dados.warning[i] = res.data;
        //   } else {
        //     this.dados.warning.push(res.data);

        //   }
        // }

        // this.updateColetaTempStorage(this.dados.code_qr);
      }
    })
  }

  async saveColeta() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      mode: 'ios',
      message: `Finalizar visita ?`,
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            console.log('medicos', this.dados.medicos);
            console.log('warning', this.dados.warning);

            if (this.dados.medicos.length == 0 && this.dados.warning.itens.length == 0) {
              return this.message.toastError('Sem itens coletados..');
            }

            this.sendColeta();
          }
        }
      ]
    });

    await alert.present();
  }

  sendColeta() {
    this.message.load_present();
    this.service.updateColeta({ status: 2 }, this.dados.uuid).then(() => {
      this.navCtrl.navigateRoot('/home');
    }).catch(err => {
      // this.storageColeta();
    }).finally(() => this.message.load_dismiss());
  }

  // async coletaEmpty() {
  //   const alert = await this.alertCtrl.create({
  //     cssClass: 'my-custom-class',
  //     header: 'Atenção!',
  //     mode: 'ios',
  //     message: `Visita sem coleta ?`,
  //     buttons: [
  //       {
  //         text: 'Voltar',
  //         cssClass: 'secondary'
  //       }, {
  //         text: 'Confirmar',
  //         handler: () => {
  //           this.dados.sem_coleta = 1;
  //           this.sendColeta();
  //         }
  //       }
  //     ]
  //   });

  //   await alert.present();
  // }

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

  async confirmRemove(item, i) {
    let message = `Deseja remover a coleta do médico: <b>${item.nome}</b> ?`;
    if (!item.nome) {
      message = `Deseja remover as ocorrências ?`
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
            this.dados.medicos.splice(i, 1);
          }
        }
      ]
    });

    await alert.present();
  }

  async openMedicoSearch() {
    const modal = await this.modalCtrl.create({
      component: ModalMedicosPage
    });

    await modal.present();
    modal.onDidDismiss().then(res => {
      // console.log(res);
      if (res.data) {
        this.addMedicoConfirme(res.data);
      } else {
        // this.getDadosClinica(this.clinica.uuid);
      }
    })
  }

  async addMedicoConfirme(item) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      mode: 'ios',
      message: `Adicionar o medico: <b>${item.nome}</b> a esta clinica/local ?`,
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary'
        }, {
          text: 'Sim',
          handler: () => {
            this.addMedico(item.uuid);
          }
        }
      ]
    });

    await alert.present();
  }

  addMedico(medico_id) {
    const request = {
      medico_id: medico_id,
      clinica_id: this.clinica.uuid
    };

    this.message.load_present();
    this.medicoService.setMedicoClinica(request).then(res => {
      // this.getDadosClinica(this.clinica.uuid);
    }).finally(() => this.message.load_dismiss());
  }

}
