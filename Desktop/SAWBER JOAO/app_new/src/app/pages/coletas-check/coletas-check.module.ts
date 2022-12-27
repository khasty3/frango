import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColetasCheckPageRoutingModule } from './coletas-check-routing.module';

import { ColetasCheckPage } from './coletas-check.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColetasCheckPageRoutingModule,
    SharedModule
  ],
  declarations: [ColetasCheckPage]
})
export class ColetasCheckPageModule { }
