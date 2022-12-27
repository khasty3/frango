import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotificationDetalhePage } from './notification-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: NotificationDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotificationDetalhePageRoutingModule {}
