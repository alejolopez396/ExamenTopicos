import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from "@angular/router";
import { LoginPageModule } from '../componentes/login/login.module';
import { AuthService } from '../servicios/auth.service';
import { ChatService } from '../servicios/chat.service';

interface chat {
  idUsu1: string;
  idUsu2: string;
  nombre1: string;
  nombre2: string;
  mensajes: {}
}

interface usuarioss {
  email: string,
  nombre : string,
  password : string 
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuarios: any = [];
  chatsContactos: any = [];
  usuarioActivo: string;
  nombredeUsuario1: string;
  nombredeUsuario2: string;
  nombredeUsuario: string;

  crChat: chat;

  constructor(private auth: AngularFireAuth, private router: Router, private db: AuthService,
    private chatservice: ChatService) {
    this.crChat = {
      idUsu1: '',
      idUsu2: '',
      nombre1: '',
      nombre2: '',
      mensajes: {}
    }
  }

  ngOnInit() {
    this.cargarUsuarios();

    this.db.isAuth().subscribe(res => {
      this.usuarioActivo = res.uid;
      this.db.obtenernombreUsuario(this.usuarioActivo).subscribe(user=>{
        const data: usuarioss = user.payload.data() as usuarioss;
        this.nombredeUsuario = data.nombre;
      });
    });

    this.cargarChats();
  }


  cargarUsuarios() {
    this.db.getUsuarios().subscribe(res => {
      console.log(res);
      this.usuarios = res;

    });
  }
  salir() {
    this.auth.signOut().then(res => {
      console.log("ya saliste");
      this.router.navigate(['/login'])
      alert('Usted ha salido de su perfil');

    });

  }

  chat(idContacto: string,nombreContacto: string) {

    this.crChat.idUsu1 = this.usuarioActivo;
    this.crChat.idUsu2 = idContacto;
    this.crChat.nombre1 = this.nombredeUsuario;
    this.crChat.nombre2 = nombreContacto;
    var primera = false;
    var segunda = false;
   
    for (let i = 0; i < this.chatsContactos.length; i++) {        
        
      if(this.chatsContactos[i].idUsu1 == this.usuarioActivo || this.chatsContactos[i].idUsu2 ==  this.usuarioActivo){
        primera = true;
      }
      
    }

    for (let i = 0; i < this.chatsContactos.length; i++) {
      if(this.chatsContactos[i].idUsu1 == this.crChat.idUsu2 || this.chatsContactos[i].idUsu2 == this.crChat.idUsu2){
        segunda = true;
      }
      
    }

    console.log(primera);
    console.log(segunda);
    
    if(primera && segunda){
      console.log('ya existe');
      alert("El chat ya existe revisa tus chats ");
    }
    if(primera && !segunda){
      console.log('crear chat');
      this.chatservice.crearChat(this.crChat).then(() => {
        alert("chat creado");
      });
    }
    if(!primera && segunda){
      console.log('crear chat');
      this.chatservice.crearChat(this.crChat).then(() => {
        alert("chat creado");
      });
    }
    if(!primera && !segunda){
      console.log('crear chat de falso falso');
      this.chatservice.crearChat(this.crChat).then(() => {
        alert("chat creado");
      });
    }
    
   
  }

  cargarChats(){
    this.chatservice.obternerChats().subscribe(res=>{
      this.chatsContactos = res;
      console.log(this.chatsContactos);
      
    });
  }


  irAmisChats() {
    this.router.navigate(['mischats']);
  }


}
