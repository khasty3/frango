import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicoFormPageRoutingModule } from './medico-form-routing.module';

import { MedicoFormPage } from './medico-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicoFormPageRoutingModule
  ],
  declarations: [MedicoFormPage]
})
export class MedicoFormPageModule {}
