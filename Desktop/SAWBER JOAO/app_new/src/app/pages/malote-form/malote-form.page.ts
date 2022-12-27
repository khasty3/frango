import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { AuthService } from 'src/app/services/auth.service';
import { MaloteService } from 'src/app/services/malote.service';
import { MessageService } from 'src/app/services/message.service';
import { MaloteSetorComponent } from './malote-setor/malote-setor.component';

@Component({
  selector: 'app-malote-form',
  templateUrl: './malote-form.page.html',
  styleUrls: ['./malote-form.page.scss'],
})
export class MaloteFormPage implements OnInit {

  clinica: any = {};
  dados: any = { setores: [] };

  setores = [
    { key: 1, titulo: 'Faturamento' },
    { key: 2, titulo: 'Financeiro' },
    { key: 3, titulo: 'Patologia' },
    { key: 4, titulo: 'Laudos' },
  ];

  user: any = {};

  constructor(
    private navCtrl: NavController,
    private routerActive: ActivatedRoute,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private storage: Storage,
    // private medicoService: MedicoService,
    private authService: AuthService,
    private service: MaloteService,
    private message: MessageService
  ) {
    this.storage.create();
  }

  async ngOnInit() {
    const session = await this.authService.getSession();
    this.user = session.user;
    this.dados.portador_id = this.user.uuid;

    this.routerActive.params.subscribe(params => {
      console.log(params);
      if (params.clinica_id && params.code_qr) {

        this.dados.code_qr = params.code_qr;
        this.dados.clinica_id = params.clinica_id;

        this.getDados(params.clinica_id)
      }
    }).unsubscribe();
  }

  getDados(id) {
    this.message.load_present();
    this.service.getClinica(id).then(res => {
      this.clinica = res;
      this.dados.clinica = res.description;
      // this.getColeta(id);
    }).finally(() => this.message.load_dismiss());
  }

  usedItem(select) {
    let show = true;
    for (let item of this.dados.setores) {
      // console.log('item', item);
      if (item.key == select.key) {
        show = false;
      }
    }

    return show;
  }

  async open(setor, i = undefined) {
    const modal = await this.modalCtrl.create({
      component: MaloteSetorComponent,
      componentProps: {
        'data': setor,
      }
    });

    await modal.present();
    modal.onDidDismiss().then(res => {
      console.log(res);
      if (res.data) {
        if (i >= 0) {
          console.log('index open', i);
          this.dados.setores[i] = res.data;
        } else {
          this.dados.setores.push(res.data);
        }

        console.log('dados setores', this.dados.setores);
      }
    })
  }

  async save() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      mode: 'ios',
      message: `Finalizar malote ?`,
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            if (this.checkEmpty() == false) {
              return this.message.toastError('Sem itens coletados..');
            }

            this.send();
          }
        }
      ]
    });

    await alert.present();
  }

  checkEmpty() {
    if (this.dados.setores.length == 0) {
      return false;
    }
    let retorno = true;
    for (let setor of this.dados.setores) {
      console.log(setor);
      if (setor.itens.length == 0) {
        retorno = false;
      }
    }

    return retorno;
  }

  send() {
    this.message.load_present();
    this.service.createColeta(this.dados).then(() => {
      this.navCtrl.navigateRoot('/home');
    }).catch(err => {
      this.storageMalote();
    }).finally(() => this.message.load_dismiss());
  }

  async storageMalote() {

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Aviso!',
      mode: 'ios',
      message: 'Seu malote foi armazenada no dispositivo por falta de internet... \n Será enviado quando a mesma for restaurada.',
      buttons: ['OK']
    });

    await alert.present();

    this.storage.get('malotes').then(res => {

      if (res && res != null) { //temos coletas
        let malotes = res;
        malotes.push(this.dados);
        this.setMalotes(malotes);
      } else { //sem malotes
        let malotes = [];
        malotes.push(this.dados);
        this.setMalotes(malotes);
      }

    }).catch(err => {
      this.message.toastError('Falha ao verificar coletas no dispositivo.');
      console.log(err);
    })
  }

  setMalotes(coletas) {
    this.storage.set('coletas', coletas).then(() => {
      this.navCtrl.navigateRoot('/home');
    }).catch(err => {
      this.message.toastError('Falha ao salvar coleta no dispositivo.');
      console.log(err);
    });
  }

  async confirmRemove(item, i) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      mode: 'ios',
      message: `Deseja remover o molete do: <b>${item.titulo}</b> ?`,
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: () => {
            this.dados.setores.splice(i, 1);
          }
        }
      ]
    });

    await alert.present();
  }


}
