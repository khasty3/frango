import { Component, OnInit } from '@angular/core';
import { CheckboxControlValueAccessor } from '@angular/forms';
import { ActionSheetController, AlertController, ModalController } from '@ionic/angular';
import { filter } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { MessageService } from 'src/app/services/message.service';
import { RoteiroService } from 'src/app/services/roteiro.service';
import { StringDecoder } from 'string_decoder';
import { ModalClinicasComponent } from '../shared/modal-clinicas/modal-clinicas.component';

@Component({
  selector: 'app-roteiros',
  templateUrl: './roteiros.page.html',
  styleUrls: ['./roteiros.page.scss'],
})
export class RoteirosPage implements OnInit {

  dataSource = [];  
  filters: any = {};
  user: any = {};


  cucumber=[];
  //let obj = {};
  //sscurrentFood = undefined;

  



  constructor(
    private actionSheetController: ActionSheetController,
    private modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private authService: AuthService,
    private service: RoteiroService,
    private message: MessageService
  ) {

  }



  async ngOnInit() {
    const session = await this.authService.getSession();
    this.filters.user_id = session.user.uuid;
  }









   updateCucumber() {
    //console.log(this.cucumber);
    let js = JSON.stringify(this.cucumber).replace(/"/g,"").split('[').join("").split(']').join("");
    this.filters.dias = js;
    console.log(js);
    if(js ==''){
      this.filters.dias = null;
    }
    this.getClinicas();
    
  }





  
/*  async selectRoteiro() {
     //this.getClinicas();
    const alert  = await this.alertCtrl.create({
      // header: 'Albums',
      // cssClass: 'my-custom-class',
      
      mode: 'ios',
    inputs:[
      {
        type:'checkbox',
        name:'segunda',
        label:'Segunda',
        checked : false, 
        value: 1,
        handler: (segunda) => {
          if(segunda.checked){
            this.data0 = 'segunda';     
            segunda.checked;      
        }else{
          this.data0 = '';  
        }            
       }
      },
       {
        type:'checkbox',
        name:'terca',
        label:'terca',
        checked : false, 
        value: 2,
        handler: (terca) => {
          if(terca.checked){
            this.data1 = 'terça';     
            terca.checked;      
        }else{
          this.data1 = '';  
        }            
       }
        
       },
       {
        type:'checkbox',
        name:'quarta',
        label:'quarta',
        checked : false, 
        value: 3,
        handler: (quarta) => {
          if(quarta.checked){
            this.data2 = 'Quarta';     
            quarta.checked;      
        }else{
          this.data2 = '';  
        }            
       }
        
       },
       {
        type:'checkbox',
        name:'quinta',
        label:'quinta',
        checked : false, 
        value: 4,
       
       },
       {
        type:'checkbox',
        name:'sexta',
        label:'sexta',
        checked : false, 
        value: 5,
       }
    ],
      buttons: [
        {
          text: 'Filtrar dias',
          // role: 'destructive',
          // icon: 'trash',
          
          handler: (data) => {
           if(data[0] == null){
              data[0] = '';
            }
            if(data[1] == null){
              data[1] = '';
            }
            if(data[2] == null){
              data[2] = '';
            }
            if(data[3] == null){
              data[3] = '';
            }
            if(data[4] == null){
              data[4] = '';
            }
            console.log(data[0]);
            //console.log(data[0],data[1],data[2],data[3],data[4]);
           this.filters.tipo = 1;
            this.filters.dias = this.cucumber;
            this.getClinicas();
          }
        },
        
        {
          text: 'Segunda, Quarta e Sexta',
          // role: 'destructive',
          // icon: 'trash',
          
          handler: () => {
            this.filters.tipo = 1;
            this.filters.dias = '1,3,5';
            this.getClinicas();
          }
        },
         {
          text: 'Terça e Quinta',
          // icon: 'share',
          handler: () => {
            this.filters.tipo = 2;
            this.filters.dias = '2,4';
            this.getClinicas();
          }
        }
      ]
    });
    await alert.present();
  }
*/

  getClinicas() {
    this.message.load_present();
    this.service.getClinicas(this.filters).then(res => {
     
      this.dataSource = res;
     
    }).finally(() => this.message.load_dismiss());
  }

  async confirmeRemove(item) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      mode: 'ios',
      message: `Remover a clinica/local: <b>${item.description}</b> deste roteiro ?`,
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary'
        }, {
          text: 'Sim',
          handler: () => {
            this.removeClinica(item);
          }
        }
      ]
    });

    await alert.present();
  }

  removeClinica(item) {
    const request = {
      dias: this.filters.dias,
      user_id: this.filters.user_id,
      clinica_id: item.uuid
    }

    this.message.load_present();
    this.service.removeClinica(request).then(() => {
      this.getClinicas();
    }).finally(() => this.message.load_dismiss());
  }

  async openClinicas() {
    const modal = await this.modalCtrl.create({
      component: ModalClinicasComponent,
    });

    await modal.present();

    modal.onDidDismiss().then(res => {
      if (res.data) {
        this.addClinicaConfirm(res.data);
      }
    })
  }

  async addClinicaConfirm(dados) {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Atenção!',
      mode: 'ios',
      message: `Adicionar a clinica/local: <b>${dados.description}</b> neste roteiro ?`,
      buttons: [
        {
          text: 'Não',
          cssClass: 'secondary'
        }, {
          text: 'Sim',
          handler: () => {
            this.addClinica(dados);
          }
        }
      ]
    });

    await alert.present();
  }

  addClinica(dados) {
    const request = {
      dias: this.filters.dias,
      user_id: this.filters.user_id,
      clinica_id: dados.uuid
    }
    this.message.load_present();
    this.service.setClinica(request).then(() => {
      this.getClinicas();
    }).finally(() => this.message.load_dismiss());
  }

}
