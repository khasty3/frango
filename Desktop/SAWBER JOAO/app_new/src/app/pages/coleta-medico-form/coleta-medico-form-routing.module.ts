import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColetaMedicoFormPage } from './coleta-medico-form.page';

const routes: Routes = [
  {
    path: '',
    component: ColetaMedicoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColetaMedicoFormPageRoutingModule {}
