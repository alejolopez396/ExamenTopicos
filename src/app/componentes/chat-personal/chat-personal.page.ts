import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { AuthService } from 'src/app/servicios/auth.service';
import { ChatService } from 'src/app/servicios/chat.service';
import { File } from '@ionic-native/file/ngx';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs/internal/Observable';
import { AngularFireStorage } from '@angular/fire/storage';
import { FormBuilder, Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { PopoverController, LoadingController, AlertController, ToastController } from '@ionic/angular';
import firestore from 'firebase';


interface mensa {
  nombre: string,
  mensaje: string,
  img?: string;
}

interface usuarioss {
  email: string,
  nombre : string,
  password : string 
}


@Component({
  selector: 'app-chat-personal',
  templateUrl: './chat-personal.page.html',
  styleUrls: ['./chat-personal.page.scss'],
})
export class ChatPersonalPage implements OnInit {

  mensajesSa: any = [];
  idSal: string;
  mensajeChat: mensa;
  usuarioActivo: string;
  nombredeUsuario: string;
  newMsg = '';

  imagePath: string;
  upload: any;
  captureDataUrl: string;
  habilitar: Boolean;
  public idu: string;
  public foto: string;

  //variables utilizadas en la imgen
  uploadPercent: Observable<number>;
  downloadUrl: Observable<string>;
  image: string;

  constructor(private activatedRoute: ActivatedRoute, 
    private chatservice: ChatService,
    private db: AuthService,
    private router: Router,
    private camera: Camera,
    private platform: Platform,
    private file: File,
    public afSG: AngularFireStorage,
    public alertController: AlertController
    ) {

      
      
    this.mensajeChat = {
      nombre: '',
      mensaje: '',
      img: ''
    }
  }

  ngOnInit() {
    this.db.isAuth().subscribe(res => {
      this.usuarioActivo = res.uid;
      this.db.obtenernombreUsuario(this.usuarioActivo).subscribe(user => {
        const data: usuarioss = user.payload.data() as usuarioss;
        this.nombredeUsuario = data.nombre;
      });
    })

    const id = this.activatedRoute.snapshot.paramMap.get('id');
    this.idSal = id;
    this.cargarMensajes(id);

  }

  cargarMensajes(idSala: string) {
    this.chatservice.obtenerSala(idSala).subscribe(res => {
      this.mensajesSa = res;
    });
  }

  enviarMensaje() {

    this.mensajeChat.nombre = this.nombredeUsuario;
    this.mensajeChat.mensaje = this.newMsg;
    if(this.foto){
      this.mensajeChat.img = this.foto;
    }else{
      this.mensajeChat.img = '';
    }
    // this.mensajeChat.img = this.foto;
    this.chatservice.agregarMensaje(this.idSal, this.mensajeChat);
    this.mensajeChat.img = '';
    this.newMsg = '';
  }

  /*Funciones para la camara*/
  async addPhoto(source: string) {

    switch (source) {
      case 'camera': {
        console.log('camera');
        const cameraPhoto = await this.openCamera();
        this.image = cameraPhoto;
        console.log(this.image);

        const fileURI = this.image;
        let file: string;

        if (this.platform.is('ios')) {
          file = fileURI.split('/').pop();
        } else {
          file = fileURI.substring(fileURI.lastIndexOf('/') + 1);
          console.log(file);
        }
        const path: string = fileURI.substring(0, fileURI.lastIndexOf('/'));

        console.log(path);

        const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
        const blob: Blob = new Blob([buffer], { type: 'image/jpeg' });

        const id = Math.random().toString(36).substring(2);
        this.imagePath = `chatImg/img_${id}` + '.jpg';

        const ref = this.afSG.ref(this.imagePath);
        const task = ref.put(blob);

        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges().pipe(
          finalize(() => this.downloadUrl = ref.getDownloadURL())
        ).subscribe();

        task.then((uploadSnapshot: firestore.storage.UploadTaskSnapshot) => {
          console.log("Imagen subida");
          const downloadURL = ref.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {

              this.image = url;
              this.foto = this.image;
            }
          });
        });

        break;
      }
      case 'library': {
        console.log('library');
        const libraryImage = await this.openLibrary();
        this.image = libraryImage;
        console.log(this.image);

        const fileURI = this.image;
        let file: string;

        if (this.platform.is('ios')) {
          file = fileURI.split('/').pop();
        } else {
          file = fileURI.substring(fileURI.lastIndexOf('/') + 1, fileURI.indexOf('?'));
          console.log("aqui");
          console.log(file);
        }

        const path: string = fileURI.substring(0, fileURI.lastIndexOf('/'));

        console.log(path);

        const buffer: ArrayBuffer = await this.file.readAsArrayBuffer(path, file);
        const blob: Blob = new Blob([buffer], { type: 'image/jpeg' });

        const id = Math.random().toString(36).substring(2);
        this.imagePath = `chatImg/img_${id}` + '.jpg';

        const ref = this.afSG.ref(this.imagePath);
        const task = ref.put(blob);

        this.uploadPercent = task.percentageChanges();
        task.snapshotChanges().pipe(
          finalize(() => this.downloadUrl = ref.getDownloadURL())
        ).subscribe();

        task.then((uploadSnapshot: firestore.storage.UploadTaskSnapshot) => {
          console.log("Imagen subida");
          const downloadURL = ref.getDownloadURL();
          downloadURL.subscribe(url => {
            if (url) {

              this.image = url;
              this.foto = this.image;
            }
          });
        });

        break;
      }
    }
  }


  //funciones para abrir la camara
  async openLibrary() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };
    return await this.camera.getPicture(options);
  }

  async openCamera() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 1000,
      targetHeight: 1000,
      sourceType: this.camera.PictureSourceType.CAMERA
    };
    return await this.camera.getPicture(options);
  }

  async presentAlertCamera() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      message: '<strong>Seleccione:</strong>!!!',
      buttons: [
        {
          text: 'Camara',
          handler: () => {
            console.log('Camara');
            this.addPhoto('camera');
          }
        },
        {
          text: 'Galeria',
          handler: () => {
            console.log('Galeria');
            this.addPhoto('library');
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }
      ]
    });

    await alert.present();
  }

  cerrarChat(){
    this.router.navigate(['/mischats']);
  }
}
