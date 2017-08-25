import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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

  constructor(public afDB: AngularFireDatabase, public afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {

      this.publicaciones = this.afDB.list('/publicaciones');
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

}
