import { Component, Input, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { ColetaService } from 'src/app/services/coleta.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-modal-confirme-notification',
  templateUrl: './modal-confirme-notification.component.html',
  styleUrls: ['./modal-confirme-notification.component.scss'],
})
export class ModalConfirmeNotificationComponent implements OnInit {

  dados: any = { itens: [] };

  @Input() data: any;
  constructor(
    private modalCtrl: ModalController,
    private navCtrl: NavController,
    private service: ColetaService,
    private message: MessageService
  ) { }

  ngOnInit() {
    console.log('confirme', this.data);

    if (this.data.solicitacao) {
      this.getDadoSolicitacao(this.data.solicitacao.uuid)
    }
    if (this.data.devolucao) {
      this.getDadoDevolucao(this.data.devolucao.uuid);
    }
  }

  closeModal(params = undefined) {
    this.modalCtrl.dismiss(params);
  }

  getTitle() {
    if (this.data.solicitacao) {
      return 'Solicitação';
    }
    if (this.data.devolucao) {
      return 'Devolução';
    }

    return 'Notificação'
  }

  getDadoSolicitacao(id) {
    this.message.load_present();
    this.service.getSolicitacao(id).then(res => {
      this.dados = res;
    }).finally(() => this.message.load_dismiss());
  }
  getDadoDevolucao(id) {
    this.message.load_present();
    this.service.getDevolucao(id).then(res => {
      this.dados = res;
    }).finally(() => this.message.load_dismiss());
  }

  async acceptSolicitacao(value) {
    this.message.load_present();
    this.service.updateSolicitacao(this.dados.uuid, { origin: 'app', portador_accepted: value }).then(res => {
      if(value == 0){
        window.location.reload(); 
      }
      else if(value == 1){
        //this.navCtrl.back();
        window.location.reload(); 
        //this.modalCtrl.dismiss();
      }
     // window.location.reload();
}).finally(() => this.message.load_dismiss());
  }

  async acceptDevolucao(value) {
    this.message.load_present();
    this.service.updateDevolucao(this.dados.uuid, { origin: 'app', portador_accepted: value }).then(res => {
         
      
      if(value == 0){
        window.location.reload(); 
      }
      else if(value == 1){
        //this.navCtrl.back();
        window.location.reload(); 
       // this.modalCtrl.dismiss();
      }
    // window.location.reload();
    }).finally(() => this.message.load_dismiss());
  }


  finish(value) {
    if (this.data.solicitacao) {
      this.acceptSolicitacao(value)
    }
    if (this.data.devolucao) {
      this.acceptDevolucao(value)
    }
  }

}
