import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

// import { Camera, CameraOptions } from '@awesome-cordova-plugins/camera/ngx';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { MessageService } from "./message.service";
// import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor(
    private messageService: MessageService,
    // private backgroundMode: BackgroundMode,
    public foregroundService: ForegroundService
  ) { }

  async takePhoto() {
    // this.backgroundMode.enable();

    // this.backgroundMode.on("activate").subscribe(() => {
    //   this.backgroundMode.disableWebViewOptimizations();
    //   this.backgroundMode.disableBatteryOptimizations();
    //   console.log("background activate !!!!");
    // });

    this.startService();
    const image = await Camera.getPhoto({
      quality: 50,
      allowEditing: false,
      resultType: CameraResultType.Base64,
      source: CameraSource.Camera,
    })
      .catch(err => {
        console.log('err photo', err);
        this.messageService.toastError(`Falha ao tirar photo: ${JSON.stringify(err)}`)
      }).finally(() => {
        // this.backgroundMode.disable()
        this.stopService();
      });

    return image;
  }

  startService() {
    // Notification importance is optional, the default is 1 - Low (no sound or vibration)
    this.foregroundService.start('Segundo Plano', 'Aguardando foto...');
  }

  stopService() {
    // Disable the foreground service
    this.foregroundService.stop();
  }

}
