import { Component, Input, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { CameraService } from 'src/app/services/camera.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-malote-item',
  templateUrl: './malote-item.component.html',
  styleUrls: ['./malote-item.component.scss'],
})
export class MaloteItemComponent implements OnInit {

  dados: any = {};

  // types = [];

  constructor(
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    // private service: ColetaService,
    private message: MessageService,
    private cameraService: CameraService

  ) { }

  ngOnInit() {
    // this.getTipos();
  }

  close(params = undefined) {
    this.modalCtrl.dismiss(params);
  }

  // getTipos() {
  //   this.message.load_present();
  //   this.service.getExameTypes().then(res => {
  //     this.types = res;
  //   }).finally(() => this.message.load_dismiss());
  // }

  // changeTipo(event) {
  //   // console.log(uuid);
  //   const uuid = event.value;
  //   this.dados.tipo_id = uuid;
  //   this.dados.tipo = this.types.find(tipo => tipo.uuid == uuid);
  // }

  confirmItem() {
    if (!this.dados.foto) {
      return this.message.toastError('Tire uma foto do exame coletado.');
    }

    this.close(this.dados);
  }

  async takePhoto() {
    // Take a photo
    // const capturedPhoto = await Camera.getPhoto({
    //   resultType: CameraResultType.Base64,
    //   allowEditing: false,
    //   source: CameraSource.Camera,
    //   direction: CameraDirection.Rear,
    //   quality: 70
    // });
    // const options: CameraOptions = {
    //   quality: 50,
    //   destinationType: this.camera.DestinationType.DATA_URL,
    //   encodingType: this.camera.EncodingType.JPEG,
    //   mediaType: this.camera.MediaType.PICTURE
    // }

    // // if (this.backgroundMode.isActive()) {
    // let capturedPhoto = await this.camera.getPicture(options)
    //   .finally(() => {
    //     // this.backgroundMode.disable()
    //   });
    let image: any = await this.cameraService.takePhoto();
    if (image.base64String) {
      this.dados.foto = `data:image/jpeg;base64,${image.base64String}`;
    }

    // console.log(capturedPhoto);
    // this.dados.foto = `data:image/jpeg;base64,${capturedPhoto}`;
  }

}
