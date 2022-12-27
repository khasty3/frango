import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DevolucoesPageRoutingModule } from './devolucoes-routing.module';

import { DevolucoesPage } from './devolucoes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DevolucoesPageRoutingModule
  ],
  declarations: [DevolucoesPage]
})
export class DevolucoesPageModule {}
