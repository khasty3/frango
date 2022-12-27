import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColetaMedicoFormPageRoutingModule } from './coleta-medico-form-routing.module';

import { ColetaMedicoFormPage } from './coleta-medico-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColetaMedicoFormPageRoutingModule
  ],
  declarations: [ColetaMedicoFormPage]
})
export class ColetaMedicoFormPageModule {}
