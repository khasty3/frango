import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotificationDetalhePageRoutingModule } from './notification-detalhe-routing.module';

import { NotificationDetalhePage } from './notification-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NotificationDetalhePageRoutingModule
  ],
  declarations: [NotificationDetalhePage]
})
export class NotificationDetalhePageModule {}
