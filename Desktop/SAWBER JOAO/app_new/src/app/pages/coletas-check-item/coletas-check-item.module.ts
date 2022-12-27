import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ColetasCheckItemPageRoutingModule } from './coletas-check-item-routing.module';

import { ColetasCheckItemPage } from './coletas-check-item.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ColetasCheckItemPageRoutingModule
  ],
  declarations: [ColetasCheckItemPage]
})
export class ColetasCheckItemPageModule {}
