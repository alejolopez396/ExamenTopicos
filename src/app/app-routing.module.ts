import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./guards/auth.guard";
import {NologinGuard} from "./guards/nologin.guard";


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule), canActivate:[AuthGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./componentes/login/login.module').then( m => m.LoginPageModule), 
  },
  {
    path: 'registrousuario',
    loadChildren: () => import('./componentes/registrousuario/registrousuario.module').then( m => m.RegistrousuarioPageModule),
  },
  {
    path: 'chatindividual',
    loadChildren: () => import('./componentes/chatindividual/chatindividual.module').then( m => m.ChatindividualPageModule),
  },
  {
    path: 'mischats',
    loadChildren: () => import('./componentes/mischats/mischats.module').then( m => m.MischatsPageModule),
  },
  {
    path: 'chat-personal/:id',
    loadChildren: () => import('./componentes/chat-personal/chat-personal.module').then( m => m.ChatPersonalPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
