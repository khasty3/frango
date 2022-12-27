import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MalotesPageRoutingModule } from './malotes-routing.module';

import { MalotesPage } from './malotes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MalotesPageRoutingModule
  ],
  declarations: [MalotesPage]
})
export class MalotesPageModule {}
