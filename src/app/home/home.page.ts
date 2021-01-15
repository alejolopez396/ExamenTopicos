import { Route } from '@angular/compiler/src/core';
import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import{Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private auth: AngularFireAuth, private router:Router) {}

  salir(){
    this.auth.signOut().then(res =>{
      console.log("ya saliste");
      this.router.navigate(['/login'])
      alert('Usted ha salido de su perfil');
      
    })

  }


}
