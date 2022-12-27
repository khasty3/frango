import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacaoFormPage } from './solicitacao-form.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacaoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacaoFormPageRoutingModule {}
