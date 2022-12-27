import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EntregaDetalhePage } from './entrega-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: EntregaDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EntregaDetalhePageRoutingModule {}
