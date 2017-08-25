import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { UUID } from 'angular2-uuid';
import { Articulo } from "../../models/articulo";
import { VideoIdPipe } from "../../pipes/video-id/video-id";

@IonicPage()
@Component({
  selector: 'page-agregar-articulo',
  templateUrl: 'agregar-articulo.html',
})
export class AgregarArticuloPage {

  articulos: FirebaseListObservable<any>;
  publicaciones: FirebaseListObservable<any>;
  articulo: Articulo = new Articulo;

  formulario: FormGroup;

  constructor(public afAuth: AngularFireAuth, public afDB: AngularFireDatabase,
    public formBuilder: FormBuilder, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public fb: FirebaseApp,
    public navCtrl: NavController, public navParams: NavParams) {

      this.publicaciones = this.afDB.list('publicaciones');

      this.formulario = this.formBuilder.group({
        titulo: ['', Validators.compose([Validators.required])],
        descripcion: ['', Validators.compose([Validators.required])],
        thumbnail: ['', Validators.compose([Validators.required])],
        parent: ['', Validators.compose([Validators.required])],
        video: ['', Validators.compose([Validators.required])],
      });
  }

  fileEvent(fileInput: any){
    let file = fileInput.target.files[0];
    this.articulo.thumbnail = file;
  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  cargar(){
    this.articulo.video = new VideoIdPipe().transform(this.formulario.value.video, null);
    console.log(this.articulo.video);
    if (!this.formulario.valid && this.articulo.thumbnail == undefined && this.articulo.parent == undefined){
      this.presentToast('Complete el formulario');
    } else if(this.articulo.video == 'false'){
     this.presentToast('Ingrese una URL valida de Youtube'); 
    } else {
      let loader = this.loadingCtrl.create({
        content: "Cargando...",
        dismissOnPageChange: true
      });
      loader.present();
      let uuid = UUID.UUID();
      var filename = '/imagen/' + uuid + '/' + this.articulo.thumbnail.name;      
      this.fb.storage().ref(filename).put(this.articulo.thumbnail).then(resultado => {
      this.articulo.thumbnail = filename;
      this.articulos = this.afDB.list('articulos/' + this.articulo.parent);      
      this.articulos.push(this.articulo).then(result => {
          loader.dismiss();
          this.presentToast('Se cargo exitosamente el archivo.');
          this.navCtrl.pop();
        });
      });
    }
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
