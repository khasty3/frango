import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ColetaFormPage } from './coleta-form.page';

const routes: Routes = [
  {
    path: '',
    component: ColetaFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ColetaFormPageRoutingModule {}
