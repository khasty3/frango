import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMotoboyPageRoutingModule } from './modal-motoboy-routing.module';

import { ModalMotoboyPage } from './modal-motoboy.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMotoboyPageRoutingModule
  ],
  declarations: [ModalMotoboyPage]
})
export class ModalMotoboyPageModule {}
