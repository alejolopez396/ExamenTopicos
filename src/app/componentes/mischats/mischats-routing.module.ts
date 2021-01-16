import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MischatsPage } from './mischats.page';

const routes: Routes = [
  {
    path: '',
    component: MischatsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MischatsPageRoutingModule {}
