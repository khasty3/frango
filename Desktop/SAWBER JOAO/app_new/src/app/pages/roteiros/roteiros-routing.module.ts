import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RoteirosPage } from './roteiros.page';

const routes: Routes = [
  {
    path: '',
    component: RoteirosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoteirosPageRoutingModule {}
