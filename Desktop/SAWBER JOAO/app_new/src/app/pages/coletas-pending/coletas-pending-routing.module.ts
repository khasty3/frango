import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColetasPendingPage } from './coletas-pending.page';

const routes: Routes = [
  {
    path: '',
    component: ColetasPendingPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColetasPendingPageRoutingModule {}
