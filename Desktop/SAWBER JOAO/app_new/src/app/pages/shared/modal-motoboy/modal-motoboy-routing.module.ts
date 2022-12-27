import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ModalMotoboyPage } from './modal-motoboy.page';

const routes: Routes = [
  {
    path: '',
    component: ModalMotoboyPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ModalMotoboyPageRoutingModule {}
