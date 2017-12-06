import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ToastController, LoadingController } from 'ionic-angular';
import { AgregarPublicidadPage } from "../agregar-publicidad/agregar-publicidad";
import { AngularFireDatabase, FirebaseListObservable, FirebaseObjectObservable } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { Dato } from "../../models/dato";
import { VideoIdPipe } from "../../pipes/video-id/video-id";

@IonicPage()
@Component({
  selector: 'page-publicidad',
  templateUrl: 'publicidad.html',
})
export class PublicidadPage {

  bannersInicio: FirebaseListObservable<any>;
  bannersMovil: FirebaseListObservable<any>;
  datos: FirebaseObjectObservable<any>;
  dato: Dato = new Dato;
  editVid: boolean = false;
  editImg: boolean = false;
  editAud: boolean = false;
  editQS: boolean = false;
  videoId: string;

  loader: any;

  imagen: any;
  imagenQS: any;
  audio: any;

  constructor(public afDB: AngularFireDatabase, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public loadingCtrl: LoadingController,
    public fb: FirebaseApp,
    public navCtrl: NavController, public navParams: NavParams) {
      this.datos = afDB.object('datos', {preserveSnapshot: true});
      this.datos.subscribe(v => {
        this.dato = v.val();
        this.videoId = this.dato.videoId;
      });
      this.bannersInicio = this.afDB.list('/banners', {
        query: {
          equalTo: '1',
          orderByChild: 'type'
        }
      });
      this.bannersMovil = this.afDB.list('/banners', {
        query: {
          equalTo: '2',
          orderByChild: 'type'
        }
      });
  }

  agregar(){
    this.navCtrl.push(AgregarPublicidadPage);
  }

  eliminar(key: string, type: number, image: string){
    console.log("haciendolo");
    let confirm = this.alertCtrl.create({
      title: '¿Desea eliminar este archivo?',
      buttons: [
        {
          text: 'Cancelar',
          handler: () => {
            
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.eliminarFinal(key, type, image);
          }
        }
      ]
    });
    confirm.present();
  }

  eliminarFinal(key: string, type: number, image: string){
    this.presentLoading();
    this.fb.storage().ref().child(image).delete().then(
      ref => {
        if(type == 1){
          this.bannersInicio.remove(key).then(resolve => {
            this.loader.dismiss();
            this.presentToast('Eliminado satisfactoriamente');
          });
        }else{
          this.bannersMovil.remove(key).then(resolve => {
            this.loader.dismiss();
            this.presentToast('Eliminado satisfactoriamente');
          });
        }

      });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    this.loader.present();
  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  editarVid(){
    this.editVid = !this.editVid;
    if(!this.editVid){
      if(this.dato.videoId != this.videoId){
        this.dato.videoId = new VideoIdPipe().transform(this.dato.videoId, null);         
      } 
      if(this.dato.videoId == ''){
        this.presentToast('El campo de video no debe estar vacio');
      } else if(this.dato.videoId == 'false' && this.dato.videoId != this.videoId){
        this.presentToast('Ingrese una URL valida de Youtube'); 
        this.dato.videoId = this.videoId;
      }else if(this.videoId == this.dato.videoId){
        this.presentToast('Sin ningun cambio');
      }else{
        this.presentLoading();
        this.datos.update({videoId: this.dato.videoId}).then(v => {
          this.presentToast('Video Actualizado');
          this.loader.dismiss();
        });
      }
    }
  }

  editarAud(){
    if(this.editAud){
      if(this.audio != null){
        let loader = this.loadingCtrl.create({
          content: "Cargando...",
          dismissOnPageChange: true
        });
        loader.present();
        this.fb.storage().ref(this.dato.audio).delete().then(v => {
          this.dato.audio = this.audio;
          var filename = this.dato.audio.name;   
          var uploadTask =  this.fb.storage().ref(filename).put(this.dato.audio);
          uploadTask.on('state_changed', function(snapshot){
            var progress = (uploadTask.snapshot.bytesTransferred / uploadTask.snapshot.totalBytes) * 100;
            loader.setContent('Cargando ' + Math.floor(progress) + '% / 100%');
          });
          
          uploadTask.then(resolve => {
            this.dato.audio = filename;
            this.datos.update({audio: filename}).then(result => {
              loader.dismiss();
              this.audio = null;                  
              this.presentToast('Audio actualizado');
              this.editAud = !this.editAud;
            });
          });
        });
      }else if(this.dato.texto != ""){
       this.datos.update({texto : this.dato.texto}).then(
         result => {
           this.presentToast("Descripción actualizada");
           this.editAud = false;
         }); 
      }else{
        this.editAud = !this.editAud;                
        this.presentToast('Sin ningun cambio');
      }
    }else{
      this.editAud = !this.editAud;              
    }
  }

  editarImg(){
    if(this.editImg){
      if(this.imagen != null){
        this.presentLoading();
        this.fb.storage().ref(this.dato.imagen).delete().then(v => {
          this.dato.imagen = this.imagen;
          var filename = this.dato.imagen.name;      
          this.fb.storage().ref(filename).put(this.dato.imagen).then(resolve => {
            this.dato.imagen = filename;
            this.datos.update({imagen: filename}).then(result => {
              this.loader.dismiss();
              this.imagen = null;                  
              this.presentToast('Imagen actualizado');
              this.editImg = !this.editImg;
              
            });
          });
        });
      }else{
        this.editImg = !this.editImg;                
        this.presentToast('Sin ningun cambio');
      }
    }else{
      this.editImg = !this.editImg;              
    }
  }

  fileEvent(fileInput: any){
    let file = fileInput.target.files[0];
    this.imagen = file;
  }

  fileEvent2(fileInput: any){
    let file = fileInput.target.files[0];
    this.audio = file;
  }

  fileEvent3(fileInput: any){
    let file = fileInput.target.files[0];
    this.imagenQS = file;
  }

  editarQS(){
    if(this.editQS){
      if(this.imagenQS != null){
        this.presentLoading();
        this.fb.storage().ref(this.dato.quienesSomos).delete().then(v => {
          this.dato.quienesSomos = this.imagenQS;
          var filename = this.dato.quienesSomos.name;      
          this.fb.storage().ref(filename).put(this.dato.quienesSomos).then(resolve => {
            this.dato.quienesSomos = filename;
            this.datos.update({quienesSomos: filename}).then(result => {
              this.loader.dismiss();
              this.imagen = null;                  
              this.presentToast('Imagen actualizada.');
              this.editQS = !this.editQS;
              
            });
          });
        });
      }else{
        this.editQS = !this.editQS;                
        this.presentToast('Sin ningun cambio');
      }
    }else{
      this.editQS = !this.editQS;              
    }
  }
}
