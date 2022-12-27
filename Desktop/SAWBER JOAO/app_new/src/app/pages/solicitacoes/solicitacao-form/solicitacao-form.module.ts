import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SolicitacaoFormPageRoutingModule } from './solicitacao-form-routing.module';

import { SolicitacaoFormPage } from './solicitacao-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SolicitacaoFormPageRoutingModule
  ],
  declarations: [SolicitacaoFormPage]
})
export class SolicitacaoFormPageModule {}
