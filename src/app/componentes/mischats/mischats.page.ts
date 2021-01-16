import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/servicios/auth.service';
import { ChatService } from 'src/app/servicios/chat.service';

@Component({
  selector: 'app-mischats',
  templateUrl: './mischats.page.html',
  styleUrls: ['./mischats.page.scss'],
})
export class MischatsPage implements OnInit {

  usuarioActivo: string;
  mischats: any = [];
  nombre: any = [];

  constructor(private auth: AngularFireAuth, 
    private router: Router, 
    private db : AuthService, 
    private chatservise: ChatService,
    private authservice: AuthService) { }

  ngOnInit() {
    this.db.isAuth().subscribe(res=>{
      this.usuarioActivo = res.uid
    });

    this.cargarMisChats();
  }

  cargarMisChats(){
    this.mischats = [];

    this.chatservise.obternerChats().subscribe(res=>{
    var contador =0;
      for (let i = 0; i < res.length; i++) {

        if(res[i].idUsu1==this.usuarioActivo || res[i].idUsu2 == this.usuarioActivo){
          
          this.mischats[contador] = res[i];
          contador++;
        }
      }
      console.log(this.mischats);
      
    });

    //hacer otro for con los nombres

  }

  salir(){
    this.auth.signOut().then(res =>{
      console.log("ya saliste");
      this.router.navigate(['/login'])
      alert('Usted ha salido de su perfil');
      
    });

  }

  salaPrivada(idSala: string){
    this.router.navigate(['/chat-personal/' + idSala]);
  }

  irAContactos(){
    this.router.navigate(['/home']);
  }

}
