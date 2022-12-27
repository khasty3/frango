import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMedicosPage } from './modal-medicos.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMedicosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMedicosPageRoutingModule {}
