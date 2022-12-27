import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColetaMedicoItemFormPage } from './coleta-medico-item-form.page';

const routes: Routes = [
  {
    path: '',
    component: ColetaMedicoItemFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColetaMedicoItemFormPageRoutingModule {}
