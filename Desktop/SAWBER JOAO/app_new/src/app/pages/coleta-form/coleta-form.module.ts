import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColetaFormPageRoutingModule } from './coleta-form-routing.module';

import { ColetaFormPage } from './coleta-form.page';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColetaFormPageRoutingModule,
    SharedModule
  ],
  declarations: [ColetaFormPage]
})
export class ColetaFormPageModule { }
