import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RoteirosPageRoutingModule } from './roteiros-routing.module';

import { RoteirosPage } from './roteiros.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RoteirosPageRoutingModule
  ],
  declarations: [RoteirosPage]
})
export class RoteirosPageModule {}
