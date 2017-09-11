import { AgregarCategoriaPage } from './../agregar-categoria/agregar-categoria';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DetallePublicacionPage } from "../detalle-publicacion/detalle-publicacion";
import { AgregarPublicacionPage } from "../agregar-publicacion/agregar-publicacion";
import { AngularFireAuth } from "angularfire2/auth";

@IonicPage()
@Component({
  selector: 'page-publicaciones',
  templateUrl: 'publicaciones.html',
})
export class PublicacionesPage {

  publicaciones: FirebaseListObservable<any>;
  categorias: FirebaseListObservable<any>;

  constructor(public afDB: AngularFireDatabase, public afAuth: AngularFireAuth,
    private modalCtrl: ModalController,
    public navCtrl: NavController, public navParams: NavParams) {

      this.publicaciones = this.afDB.list('/publicaciones');
      this.categorias = this.afDB.list('category_pub');
  }

  verMas(uid: string){
    this.navCtrl.push(DetallePublicacionPage, { uid });
  }

  agregar(){
    this.navCtrl.push(AgregarPublicacionPage);
  }


  signOut() {
    this.afAuth.auth.signOut();
  }

  eliminar(uid: string){
    this.categorias.remove(uid);
  }

  agregarCategoria(){
    let modal = this.modalCtrl.create(AgregarCategoriaPage);
    modal.present();
  }

}
