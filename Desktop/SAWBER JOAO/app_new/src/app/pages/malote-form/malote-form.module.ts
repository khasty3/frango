import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaloteFormPageRoutingModule } from './malote-form-routing.module';

import { MaloteFormPage } from './malote-form.page';
import { MaloteSetorComponent } from './malote-setor/malote-setor.component';
import { MaloteItemComponent } from './malote-item/malote-item.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaloteFormPageRoutingModule
  ],
  declarations: [
    MaloteFormPage,
    MaloteSetorComponent,
    MaloteItemComponent
  ]
})
export class MaloteFormPageModule { }
