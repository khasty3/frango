import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColetasPendingPageRoutingModule } from './coletas-pending-routing.module';

import { ColetasPendingPage } from './coletas-pending.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColetasPendingPageRoutingModule
  ],
  declarations: [ColetasPendingPage]
})
export class ColetasPendingPageModule {}
