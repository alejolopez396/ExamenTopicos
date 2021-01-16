import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChatPersonalPageRoutingModule } from './chat-personal-routing.module';

import { ChatPersonalPage } from './chat-personal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChatPersonalPageRoutingModule
  ],
  declarations: [ChatPersonalPage]
})
export class ChatPersonalPageModule {}
