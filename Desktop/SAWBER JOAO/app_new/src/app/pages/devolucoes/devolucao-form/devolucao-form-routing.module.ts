import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DevolucaoFormPage } from './devolucao-form.page';

const routes: Routes = [
  {
    path: '',
    component: DevolucaoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DevolucaoFormPageRoutingModule {}
