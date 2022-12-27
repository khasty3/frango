import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevolucaoFormPageRoutingModule } from './devolucao-form-routing.module';

import { DevolucaoFormPage } from './devolucao-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevolucaoFormPageRoutingModule
  ],
  declarations: [DevolucaoFormPage]
})
export class DevolucaoFormPageModule {}
