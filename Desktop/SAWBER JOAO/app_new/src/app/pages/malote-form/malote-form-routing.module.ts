import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MaloteFormPage } from './malote-form.page';

const routes: Routes = [
  {
    path: '',
    component: MaloteFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MaloteFormPageRoutingModule {}
