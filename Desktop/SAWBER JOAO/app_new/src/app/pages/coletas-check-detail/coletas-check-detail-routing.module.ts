import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColetasCheckDetailPage } from './coletas-check-detail.page';

const routes: Routes = [
  {
    path: '',
    component: ColetasCheckDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColetasCheckDetailPageRoutingModule {}
