import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ActionSheetController, AlertController, NavController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { ColetaService } from 'src/app/services/coleta.service';
import { MessageService } from 'src/app/services/message.service';
import * as moment from 'moment';
import { tokenize } from '@angular/compiler/src/ml_parser/lexer';
@Component({
  selector: 'app-solicitacao-form',
  templateUrl: './solicitacao-form.page.html',
  styleUrls: ['./solicitacao-form.page.scss'],
})
export class SolicitacaoFormPage implements OnInit {

  userCurrent: any = {};
  filters: any = {};

  dados: any = { itens: [] };
  dia: any = {
    status: 1,
    medico_id: {},
    clinica_id: {},
    portador_id: {},
    itens: [],
    force: 0,
    teste:null
  };


  constructor(
    private navCtrl: NavController,
    private actionSheetController: ActionSheetController,
    private alertController: AlertController,
    private route: ActivatedRoute,
    private service: ColetaService,
    private message: MessageService,
    private cameraService: CameraService
    // private camera: Camera
  ) { }

  ngOnInit() {
    this.route.params.subscribe(res => {
      if (res.id) {
        this.getDados(res.id);
      }
    }).unsubscribe();
  }

  getDados(id) {
    this.message.load_present();
    this.service.getSolicitacao(id).then(res => {
      this.dados = res;
    }).finally(() => this.message.load_dismiss());
  }


  async openOptions(item, i) {
    const actionSheet = await this.actionSheetController.create({
      header: `${item.material}`,
      mode: 'ios',
      // cssClass: 'my-custom-class',
      buttons: [
        {
          text: 'Ocorrência',
          icon: 'warning-outline',
          handler: async () => {
            // console.log('Delete clicked');
            let result = await this.presentAlertPrompt();
            console.log('result', result);
            if (!result.role && result.data.values.description) {
              this.dados.itens[i].description = result.data.values.description;
            }
            console.log(this.dados);
          }
        }, {
          text: 'Foto',
          icon: 'camera-outline',
          handler: async () => {
            let foto = await this.getPhoto();
            if (foto) {
              this.dados.itens[i].foto = foto;
            }
          }
        }
      ]
    });
    await actionSheet.present();
  }

  async presentAlertPrompt() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Dados da ocorrência',
      inputs: [
        {
          name: 'description',
          type: 'textarea',
          attributes: {
            rows: 5,
          },
          placeholder: 'Informe o motivo da ocorrência:'
        }
      ],
      buttons: [
        {
          text: 'Voltar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: (res) => {
            if (!res.description) {
              this.message.toastError('Informe o motivo.');
            }
          }
        }
      ]
    });

    await alert.present();

    return await alert.onDidDismiss();
  }

  async getPhoto() {
    let image: any = await this.cameraService.takePhoto();
    if (image.base64String) {
      return `data:image/jpeg;base64,${image.base64String}`;
    }
    return false;

    // // const capturedPhoto = await Camera.getPhoto({
    // //   resultType: CameraResultType.Base64,
    // //   allowEditing: false,
    // //   source: CameraSource.Camera,
    // //   direction: CameraDirection.Rear,
    // //   quality: 60
    // // });

    // // if (capturedPhoto.base64String) {
    // //   return `data:image/jpeg;base64,${capturedPhoto.base64String}`;
    // // }
    // // Take a photo
    // const options: CameraOptions = {
    //   quality: 50,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    // // if (this.backgroundMode.isActive()) {
    // let captured = await this.camera.getPicture(options)
    //   .finally(() => {
    //     // this.backgroundMode.disable()
    //   });
    // if (captured) {
    //   return `data:image/jpeg;base64,${captured}`;
    // }
    // return false;
  }
  async checkRotinaPortador() {
    // if (!this.dados.portador_id) {
    //   return this.message.toastError('A Clinica não está em nenhum roteiro.');
    // }
    
 const teste = await this.service
      .getCustom("app/motoboy/available", this.dia)
      return teste.date
  }
     
   
  async naoEntregue() {

    this.dia.portador_id = this.dados.portador.uuid
    this.dia.clinica_id = this.dados.clinica_id
    this.dia.medico_id = this.dados.medico.uuid
    const teste = await this.checkRotinaPortador()
    
    const alert = await this.alertController.create({

      mode: 'ios',
      header: 'Qual foi o motivo ?' ,
      
      inputs: [
        {
          name: 'motivo',
          type: 'text',
          placeholder: 'Digite o motivo:',
          
        },
        {
         
          type: 'text',
          value: 'Será Reagendado para:',
          disabled:true,
          cssClass: 'naoentregue',
          
        },
        {
          name: 'agendamento',
          type: 'text',
          disabled : true,
          //value: '8', 
        //  min: moment(this.dados.agendamento).format('YYYY-MM-DD') ,
          value: teste,
          cssClass: 'naoentregue',
         
          //placeholder: 'Digite o motivo:'
        }
      ],
      
      buttons: [
        {
          text: 'Voltar',
          role: 'cancel',
          cssClass: 'secondary'
        },
         {
          text: 'Confirmar',
          handler: (res) => {
            if (!res.motivo) {
              return this.message.toastError('Por favor nos diga qual foi o motivo.');
            }

            //this.dados.status = 'FINALIZADO';
            this.dados.motivo = res.motivo;
            this.dados.reagendado = 1;
            this.dados.aceito = 0;
            this.dados.agendamento = res.agendamento;

            this.message.load_present();
            this.service.updateSolicitacao(this.dados.uuid, this.dados).then(res => {
              this.navCtrl.back();
            }).finally(() => this.message.load_dismiss());
          }
        }
      ]
    });

    await alert.present();

  }
  

  async finish() {

    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Quem está recebendo ?',
      inputs: [
        {
          name: 'recebedor',
          type: 'text',
          placeholder: 'Informe o nome do atendente:'
        }
      ],
      buttons: [
        {
          text: 'Voltar',
          role: 'cancel',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: (res) => {
            if (!res.recebedor) {
              return this.message.toastError('Informe quem recebeu.');
            }

            this.dados.status = 'FINALIZADO';
            this.dados.recebedor = res.recebedor;

            this.message.load_present();
            this.service.updateSolicitacao(this.dados.uuid, this.dados).then(res => {
              this.navCtrl.back();
            }).finally(() => this.message.load_dismiss());
          }
        }
      ]
    });

    await alert.present();

  }

}

