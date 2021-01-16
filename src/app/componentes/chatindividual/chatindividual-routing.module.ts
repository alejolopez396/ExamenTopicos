import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatindividualPage } from './chatindividual.page';

const routes: Routes = [
  {
    path: '',
    component: ChatindividualPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatindividualPageRoutingModule {}
