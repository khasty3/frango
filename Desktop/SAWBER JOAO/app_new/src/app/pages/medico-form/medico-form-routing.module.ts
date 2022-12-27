import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicoFormPage } from './medico-form.page';

const routes: Routes = [
  {
    path: '',
    component: MedicoFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicoFormPageRoutingModule {}
