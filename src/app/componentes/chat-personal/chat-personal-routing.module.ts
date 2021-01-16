import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChatPersonalPage } from './chat-personal.page';

const routes: Routes = [
  {
    path: '',
    component: ChatPersonalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChatPersonalPageRoutingModule {}
