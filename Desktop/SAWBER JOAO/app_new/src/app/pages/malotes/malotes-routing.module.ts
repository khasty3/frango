import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MalotesPage } from './malotes.page';

const routes: Routes = [
  {
    path: '',
    component: MalotesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MalotesPageRoutingModule {}
