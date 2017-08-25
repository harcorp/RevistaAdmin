import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { Articulo } from "../../models/articulo";
import { UUID } from 'angular2-uuid';
import { VideoIdPipe } from "../../pipes/video-id/video-id";

@IonicPage()
@Component({
  selector: 'page-detalle-articulos',
  templateUrl: 'detalle-articulos.html',
})
export class DetalleArticulosPage {

  pubId: string;
  articuloId: string;
  articulo: FirebaseObjectObservable<any>;
  articuloPub: FirebaseObjectObservable<any>;
  comentarios: FirebaseListObservable<any>;
  loader: any;

  art: Articulo = new Articulo;

  thumbnail: string;
  editar: boolean = false;

  file: any = null;
  videoId: string;
  
  constructor(public afDB: AngularFireDatabase, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController, public alertCtrl: AlertController,
    public fb: FirebaseApp,
    public navCtrl: NavController, public navParams: NavParams) {
    this.pubId = this.navParams.get('pubId');
    this.articuloId = this.navParams.get('articuloId');

    this.articulo = this.afDB.object('articulos/' + this.pubId + '/' + this.articuloId);
    this.articuloPub = this.afDB.object('articulos/' + this.pubId + '/' + this.articuloId, {preserveSnapshot: true});
    this.articuloPub.subscribe(prueba => {
      if(prueba.val() != null){
        this.art = prueba.val();
        this.thumbnail = prueba.val().thumbnail;  
        this.videoId = prueba.val().video;      
      }
    });
    this.comentarios = this.afDB.list('comentarios/' + this.articuloId);
  }

  eliminar(){
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
            this.eliminarFinal();
          }
        }
      ]
    });
    confirm.present();
  }

  eliminarFinal(){
    this.presentLoading();
    this.fb.storage().ref().child(this.thumbnail).delete().then(
      ref => {
        this.articulo.remove().then(resolve => {
          this.navCtrl.pop();
          this.loader.dismiss();
          this.presentToast('Eliminado satisfactoriamente');
        });
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

  switchEditar(){
    this.editar = !this.editar;
  }

  fileEvent(fileInput: any){
    let file = fileInput.target.files[0];
    this.file = file;
  }

  guardar(){
    if(this.art.video != this.videoId)
    this.art.video = new VideoIdPipe().transform(this.art.video, null);    
    if(this.art.titulo == ''){
      this.presentToast('El titulo no puede estar vacio');
    } else if(this.art.video == 'false' && this.art.video != this.videoId){
      this.presentToast('Ingrese una URL valida de Youtube'); 
     } else if(this.art.descripcion == ''){
      this.presentToast('La descripcion no puede estar vacia');
    }else{
      this.presentLoading();
      if(this.file != null){
        console.log('cambio imagen');
        this.cargarImagen();
      }else{
        console.log('no cambio imagen');
        this.articulo.set(this.art).then(result => {
          this.loader.dismiss();
          this.switchEditar();
          this.presentToast('Articulo actualizada');        
        });
      }
    }
  }

  cargarImagen(){
    this.fb.storage().ref(this.art.thumbnail).delete().then(v => {
      let uuid = UUID.UUID();
      this.art.thumbnail = this.file;
      var filename = '/imagen/' + uuid + '/' + this.art.thumbnail.name;      
      this.fb.storage().ref(filename).put(this.art.thumbnail).then(resolve => {
        this.art.thumbnail = filename;
        this.articulo.set(this.art).then(result => {
          this.loader.dismiss();
          this.file = null;                  
          this.switchEditar();
          this.presentToast('Articulo actualizado');
        });
      });
    });
  }
}
