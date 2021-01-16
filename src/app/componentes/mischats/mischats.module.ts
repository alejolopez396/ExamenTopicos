import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MischatsPageRoutingModule } from './mischats-routing.module';

import { MischatsPage } from './mischats.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MischatsPageRoutingModule
  ],
  declarations: [MischatsPage]
})
export class MischatsPageModule {}
