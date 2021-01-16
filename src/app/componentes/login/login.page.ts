import { Component, OnInit } from '@angular/core';
import {AuthService} from "../../servicios/auth.service";
import{Router,Route} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email:string;
  password:string;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onSubmitlogin(){
    
    this.authService.login(this.email,this.password).then(res =>{
      console.log(res);
      this.email=' ';
      this.password='';
      this.router.navigate(['/home']);
    }).catch(err =>alert('los datos son incorrectos'))
  }

  registrousuario(){
    console.log('funciona');
    this.email='';
    this.password='';
    this.router.navigate(['/registrousuario']);
  }

}
