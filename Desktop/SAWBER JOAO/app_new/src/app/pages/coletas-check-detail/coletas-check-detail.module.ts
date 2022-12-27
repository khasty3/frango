import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColetasCheckDetailPageRoutingModule } from './coletas-check-detail-routing.module';

import { ColetasCheckDetailPage } from './coletas-check-detail.page';
import { ColetasCheckItemPageModule } from '../coletas-check-item/coletas-check-item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColetasCheckDetailPageRoutingModule,
    ColetasCheckItemPageModule
  ],
  declarations: [ColetasCheckDetailPage]
})
export class ColetasCheckDetailPageModule { }
