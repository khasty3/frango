import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SolicitacoesPage } from './solicitacoes.page';

const routes: Routes = [
  {
    path: '',
    component: SolicitacoesPage
  },
  {
    path: ':id',
    loadChildren: () => import('./solicitacao-form/solicitacao-form.module').then( m => m.SolicitacaoFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SolicitacoesPageRoutingModule {}
