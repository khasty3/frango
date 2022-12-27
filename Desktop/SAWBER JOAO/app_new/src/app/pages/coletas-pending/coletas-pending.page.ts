import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { ColetaService } from 'src/app/services/coleta.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-coletas-pending',
  templateUrl: './coletas-pending.page.html',
  styleUrls: ['./coletas-pending.page.scss'],
})
export class ColetasPendingPage implements OnInit {

  coletas = [];

  constructor(
    private storage: Storage,
    private service: ColetaService,
    private message: MessageService
  ) {
    this.storage.create();
  }

  ngOnInit() {
    this.getColeta();
  }

  getColeta() {
    this.storage.get('coletas').then(res => {
      if (res && res != null) {
        console.log(res);
        this.coletas = res;
      }
    });
  }

  sendColeta(dados, i) {
    console.log(dados);
    this.message.load_present();
    this.service.createColeta(dados).then(() => {
      // this.navCtrl.navigateRoot('/home');
      this.processColeta(i);
    }).catch(err => {
      // this.storageColeta();
    }).finally(() => this.message.load_dismiss());
  }

  processColeta(index) {
    this.coletas.splice(index, 1);

    this.storage.set('coletas', this.coletas).then(() => {
      this.getColeta();
    }).catch(err => {
      this.message.toastError('Falha ao atualizar coleta no dispositivo.');
      console.log(err);
    });
  }

}
