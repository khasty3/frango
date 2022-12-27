import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ModalMedicosPageRoutingModule } from './modal-medicos-routing.module';

import { ModalMedicosPage } from './modal-medicos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalMedicosPageRoutingModule
  ],
  declarations: [ModalMedicosPage]
})
export class ModalMedicosPageModule {}
