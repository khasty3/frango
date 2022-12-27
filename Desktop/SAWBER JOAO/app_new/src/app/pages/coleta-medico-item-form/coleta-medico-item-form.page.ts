import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { ColetaService } from 'src/app/services/coleta.service';
import { MessageService } from 'src/app/services/message.service';

// import {
//   Camera, CameraResultType, CameraSource, CameraDirection
// } from '@capacitor/camera';
// import { BackgroundMode } from '@awesome-cordova-plugins/background-mode/ngx';

@Component({
  selector: 'app-coleta-medico-item-form',
  templateUrl: './coleta-medico-item-form.page.html',
  styleUrls: ['./coleta-medico-item-form.page.scss'],
})
export class ColetaMedicoItemFormPage implements OnInit {

  dados: any = {};
  warning: boolean = false;
  types = [];

  @Input() medico: any;
  @Input() coleta_id: any;

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private service: ColetaService,
    private message: MessageService,
    private cameraService: CameraService
    // private backgroundMode: BackgroundMode,
    // private camera: Camera
  ) { }

  ngOnInit() {
    console.log('medico item form', this.medico);

    if (this.medico) {
      this.dados.medico_id = this.medico.uuid;
      this.dados.coleta_id = this.coleta_id;
      if (this.dados.medico_id) {
        this.getTipos();
      } else {
        this.warning = true;
      }
    }
  }

  close(params = undefined) {
    this.modalCtrl.dismiss(params);
  }

  getTipos() {
    this.message.load_present();
    this.service.getExameTypes().then(res => {
      this.types = res;
    }).finally(() => this.message.load_dismiss());
  }

  changeTipo(event) {
    // console.log(uuid);
    const uuid = event.value;
    this.dados.tipo_id = uuid;
    this.dados.tipo = this.types.find(tipo => tipo.uuid == uuid);
  }

  async addTipo() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Cadastrar Tipo',
      message: 'Informe o novo tipo de exame.',
      mode: 'ios',
      inputs: [
        {
          name: 'nome',
          type: 'text',
          placeholder: 'Informe o nome'
        }
      ],
      buttons: [
        {
          text: 'Voltar',
          cssClass: 'secondary'
        }, {
          text: 'Confirmar',
          handler: (data) => {

            if (!data.nome || data.nome == "") {
              return this.message.toastError('Informe o nome!');
            }

            this.message.load_present();
            this.service.setExameTypes(data).then(() => {
              this.message.load_dismiss();
              this.getTipos();
            }).catch(() => this.message.load_dismiss());

          }
        }
      ]
    });

    await alert.present();
  }

  confirmItem() {
    if (!this.dados.foto) {
      return this.message.toastError('Tire uma foto do exame coletado.');
    }
    if (!this.dados.tipo_id && !this.warning) {
      return this.message.toastError('Informe o tipo do exame coletado.');
    }
    if (!this.dados.description && this.warning) {
      return this.message.toastError('Informe o motivo da ocorrência.');
    }

    this.message.load_present();
    this.service.createItemColeta(this.dados).then(res => {
      // this.types = res;
      this.close(res.data);
    }).finally(() => this.message.load_dismiss());
  }

  async takePhoto() {
    console.log('takePhoto');
    let image: any = await this.cameraService.takePhoto();
    if (image.base64String) {
      this.dados.foto = `data:image/jpeg;base64,${image.base64String}`;
    }

    // const options: CameraOptions = {
    //   quality: 50,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    // // this.backgroundMode.enable();
    // // if (this.backgroundMode.isActive()) {
    // this.camera.getPicture(options).then(imageData => {
    //   console.log('imageDta', imageData);
    //   this.dados.foto = `data:image/jpeg;base64,${imageData}`;
    // }).finally(() => {
    //   // this.backgroundMode.disable();
    // });
    // }
  }



}
