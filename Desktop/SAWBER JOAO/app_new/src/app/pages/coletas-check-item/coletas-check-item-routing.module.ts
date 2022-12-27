import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColetasCheckItemPage } from './coletas-check-item.page';

const routes: Routes = [
  {
    path: '',
    component: ColetasCheckItemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColetasCheckItemPageRoutingModule {}
