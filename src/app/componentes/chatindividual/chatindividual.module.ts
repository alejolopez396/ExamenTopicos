import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatindividualPageRoutingModule } from './chatindividual-routing.module';

import { ChatindividualPage } from './chatindividual.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatindividualPageRoutingModule
  ],
  declarations: [ChatindividualPage]
})
export class ChatindividualPageModule {}
