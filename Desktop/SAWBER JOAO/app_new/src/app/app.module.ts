import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';

import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptService } from './services/intercept.service';

import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import localeBrExtra from '@angular/common/locales/extra/pt';
import { FormsModule } from '@angular/forms';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
// import { StatusBar } from '@ionic-native/status-bar/ngx';
// import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './pages/shared/shared.module';
import { OneSignal } from '@ionic-native/onesignal/ngx';
// import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { ForegroundService } from '@ionic-native/foreground-service/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { Geolocation } from '@awesome-cordova-plugins/geolocation/ngx';



registerLocaleData(localeBr, 'br', localeBrExtra);

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    HttpClientModule,
    FormsModule,
    IonicStorageModule.forRoot({
      name: '__mySawber',
      driverOrder: [CordovaSQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    NgbModule,
    SharedModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: LOCALE_ID, useValue: 'br' },
    { provide: HTTP_INTERCEPTORS, useClass: InterceptService, multi: true },
    // StatusBar,
    // SplashScreen,
    BarcodeScanner,
    // Camera,
    Geolocation,
    ForegroundService,
    OneSignal,
    ScreenOrientation
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
