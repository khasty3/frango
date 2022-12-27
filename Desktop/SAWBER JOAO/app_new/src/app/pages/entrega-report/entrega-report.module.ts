import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EntregaReportPageRoutingModule } from './entrega-report-routing.module';

import { EntregaReportPage } from './entrega-report.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EntregaReportPageRoutingModule
  ],
  declarations: [EntregaReportPage]
})
export class EntregaReportPageModule {}
