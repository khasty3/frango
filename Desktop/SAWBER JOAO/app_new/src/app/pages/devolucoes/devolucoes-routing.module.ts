import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevolucoesPage } from './devolucoes.page';

const routes: Routes = [
  {
    path: '',
    component: DevolucoesPage
  },
  {
    path: ':id',
    loadChildren: () => import('./devolucao-form/devolucao-form.module').then( m => m.DevolucaoFormPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevolucoesPageRoutingModule {}
