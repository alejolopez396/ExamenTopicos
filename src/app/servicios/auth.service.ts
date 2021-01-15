import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { rejects } from 'assert';
import { promise } from 'protractor';
import { Observable } from 'rxjs';
import { map, take} from 'rxjs/operators';

interface usuario{
  nombre:string,
  email:string,
  password:string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  usariosCollection:AngularFirestoreCollection <usuario>;
  usuarios:Observable <usuario[]>;

  constructor(private AFauth : AngularFireAuth, private db: AngularFirestore) {
   }

  login(email:string,password:string){

    return new Promise((resolve, rejected) => {
      //Logueo de usuario con email y password 
      this.AFauth.signInWithEmailAndPassword(email, password).then(user => {
        resolve(user)
      }).catch(err => rejected(err));
    })
  }

  createUsuario(email:string, password:string){

    return new Promise((resolve,rejected)=>{
      this.AFauth.createUserWithEmailAndPassword(email,password).then(user =>{
        resolve(user);
        const uid = user.user.uid;
        console.log('verificar: ' + uid); 
      }).catch(err => rejected(err));
    })
    
  }
}
