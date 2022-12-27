import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColetaMedicoItemFormPageRoutingModule } from './coleta-medico-item-form-routing.module';

import { ColetaMedicoItemFormPage } from './coleta-medico-item-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColetaMedicoItemFormPageRoutingModule
  ],
  declarations: [ColetaMedicoItemFormPage]
})
export class ColetaMedicoItemFormPageModule {}
