import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaloteReportPage } from './malote-report.page';

const routes: Routes = [
  {
    path: '',
    component: MaloteReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaloteReportPageRoutingModule {}
