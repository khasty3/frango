import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaloteReportPageRoutingModule } from './malote-report-routing.module';

import { MaloteReportPage } from './malote-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaloteReportPageRoutingModule
  ],
  declarations: [MaloteReportPage]
})
export class MaloteReportPageModule {}
