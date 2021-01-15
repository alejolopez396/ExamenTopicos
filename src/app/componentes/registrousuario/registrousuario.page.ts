import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';


//objeto guardar y capturar
interface usuario {
  nombre: string,
  email: string,
  password: string
}

@Component({
  selector: 'app-registrousuario',
  templateUrl: './registrousuario.page.html',
  styleUrls: ['./registrousuario.page.scss'],
})
export class RegistrousuarioPage implements OnInit {

  //llenar html
  email: string;
  password: string;
  nombre: string;
  user: usuario; //variable de tipo objeto se guardara todo lo anterior (e,contra)

  constructor(private auth: AngularFireAuth, private router: Router, private db: AngularFirestore, private authf: AngularFireAuth) { }

  //objeto guaradar base de datos
  ngOnInit() {
    this.user = {
      email: '',
      nombre: '',
      password: ''
    }
  }

  registrousuario() {
    console.log(this.email);
    if (this.email == undefined || this.password == undefined) {
      alert('Campos Vacios')
    } else {
      console.log('verificar')
      this.auth.createUserWithEmailAndPassword(this.email, this.password).then(res => {
        console.log('Registro de usuario exitoso!');
        console.log(res.user.uid);
        this.user.nombre = this.nombre;
        this.user.email = this.email;
        this.user.password = this.password;
        this.db.collection('usuarios').doc(res.user.uid).set(this.user).then(() => {
          this.router.navigate(['/login']);
          alert('Registro de usuario exitoso!');
        });
        //this.db.collection('usuarios').doc(res.user.uid).update({mensaje: 'hola'});
      })
    }


  }

  regresar() {
    console.log('funciona');
    this.router.navigate(['/login']);
    
  }

}
