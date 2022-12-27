import { Injectable } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import {
  AlertController,
  LoadingController,
  ModalController,
  ToastController,
} from '@ionic/angular';
import { ModalConfirmeNotificationComponent } from '../pages/shared/modal-confirme-notification/modal-confirme-notification.component';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  isLoading = false;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private modalCtrl: ModalController,
    private barcodeScanner: BarcodeScanner
  ) {}

  async presentToast(msg = '') {
    const toast = await this.toastController.create({
      mode: 'ios',
      message: msg,
      duration: 2500,
    });
    toast.present();
  }

  async toastSuccess(msg = '') {
    const toast = await this.toastController.create({
      cssClass: 'toast-success',
      mode: 'ios',
      buttons: ['ok'],
      message: msg,
      duration: 2500,
    });
    toast.present();
  }

  async toastError(msg = '') {
    const toast = await this.toastController.create({
      cssClass: 'toast-danger',
      mode: 'ios',
      buttons: ['ok'],
      message: msg,
      duration: 4000,
    });
    toast.present();
  }

  async presentToastWithOptions() {
    const toast = await this.toastController.create({
      header: 'Toast header',
      message: 'Click to Close',
      position: 'top',
      buttons: [
        {
          side: 'start',
          icon: 'star',
          text: 'Favorite',
          handler: () => {
            console.log('Favorite clicked');
          },
        },
        {
          text: 'Done',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          },
        },
      ],
    });
    toast.present();
  }

  async load_present() {
    this.isLoading = true;
    return await this.loadingController
      .create({
        mode: 'ios',
        // duration: 5000,
        backdropDismiss: true,
      })
      .then((a) => {
        a.present().then(() => {
          // console.log('presented');
          if (!this.isLoading) {
            a.dismiss();
          }
        });
      });
  }

  async load_dismiss() {
    this.isLoading = false;
    return await this.loadingController.dismiss();
  }

  async alertError(msg = '', title = 'Ops!') {
    const alert = await this.alertController.create({
      cssClass: 'alert-error-class',
      header: title,
      mode: 'ios',
      //   subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }
  async alertSuccess(msg = '', title = '') {
    const alert = await this.alertController.create({
      cssClass: 'alert-success-class',
      header: title,
      mode: 'ios',
      //   subHeader: 'Subtitle',
      message: msg,
      buttons: ['OK'],
    });

    await alert.present();
  }

  async loginFail() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Ops',
      mode: 'ios',
      //   subHeader: 'Subtitle',
      message:
        'Não conseguimos recuperar seus dados de login, por favor efetue o login por segurança!',
      buttons: ['OK'],
    });

    await alert.present();
  }

  async readQRCode() {
    const result: any = await this.barcodeScanner
      .scan({ formats: 'QR_CODE' })
      // .then(barcodeData => {
      //   console.log('Barcode data', barcodeData);
      // if (barcodeData.cancelled == false && barcodeData.format == "QR_CODE") {
      //   this.entregaForm(barcodeData.text);
      // }
      // })
      .catch((err) => {
        console.log('Error', err);
      });

    if (result.cancelled == false && result.format == 'QR_CODE') {
      return result.text;
      // this.entregaForm(result.text);
    }
    // else {
    // console.log('result Read QR Code', result);
    return false;
    // }
  }

  async openModalConfirme(dados) {
    const modal = await this.modalCtrl.create({
      component: ModalConfirmeNotificationComponent,
      componentProps: { data: dados },
      cssClass: 'my-custom-class',
    });
    await modal.present();
    return await modal.onDidDismiss();
  }
}
