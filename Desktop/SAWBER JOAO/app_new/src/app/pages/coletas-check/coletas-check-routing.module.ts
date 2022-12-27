import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColetasCheckPage } from './coletas-check.page';

const routes: Routes = [
  {
    path: '',
    component: ColetasCheckPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColetasCheckPageRoutingModule {}
