import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { AgregarArticuloPage } from "../agregar-articulo/agregar-articulo";
import { AngularFireAuth } from 'angularfire2/auth';
import { DetalleArticulosPage } from "../detalle-articulos/detalle-articulos";

@IonicPage()
@Component({
  selector: 'page-articulos',
  templateUrl: 'articulos.html',
})
export class ArticulosPage {

  articulos: FirebaseListObservable<any>;
  objetos: Array<any>;

  constructor(public afDB: AngularFireDatabase, public afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {

      this.articulos = this.afDB.list('/articulos');
  }

  verMas(pubId: string, articuloId: string ){
    this.navCtrl.push(DetalleArticulosPage, { pubId , articuloId});
  }

  agregar(){
    this.navCtrl.push(AgregarArticuloPage);
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
