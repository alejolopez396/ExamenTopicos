import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, DocumentReference } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import firestore from 'firebase';


interface chat{
  idUsu1: string;
  idUsu2: string;
  mensajes: {}
}

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private chatCollection: AngularFirestoreCollection<chat>;
  private chats: Observable<chat[]>;
  chatCrear: chat;

  constructor(private afs: AngularFirestore) { 

    this.chatCollection = afs.collection<chat>('chats');
    this.chats = this.chatCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data }
        });
      })
    );
  }

  obternerChats(){
    return this.chats;
  }

  obtenerSala(idchat){
    return this.afs.collection('chats').doc(idchat).valueChanges();
  }

  crearChat(chat: any): Promise<DocumentReference>{
    return this.chatCollection.add(chat);
  }

  buscarComentariosUsu(uid: string) {
    return this.afs.collection('chats', ref => ref.where('idUsu1', 'array-contains', uid));
  }

  agregarMensaje(idchat: string, mensaje: any){
    this.afs.collection('chats').doc(idchat).update({
      mensajes: firestore.firestore.FieldValue.arrayUnion(mensaje),
    })
  }

}
