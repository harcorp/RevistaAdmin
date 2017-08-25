import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import * as firebase from 'firebase/app';
import { LoginPage } from "../login/login";
import { PublicacionesPage } from "../publicaciones/publicaciones";
import { LibreriaArticulosPage } from "../libreria-articulos/libreria-articulos";
import { ArticulosPage } from "../articulos/articulos";
import { LibreriaDigitalPage } from "../libreria-digital/libreria-digital";
import { ComentariosPage } from "../comentarios/comentarios";
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { PublicidadPage } from "../publicidad/publicidad";


@IonicPage()
@Component({
  templateUrl: 'dashboard.html',
})
export class DashboardPage {

  tab1Root = PublicacionesPage;
  tab2Root = ArticulosPage;
  tab3Root = LibreriaArticulosPage;
  tab4Root = LibreriaDigitalPage;
  tab5Root = ComentariosPage;
  tab6Root = PublicidadPage;

  datosVarios: FirebaseObjectObservable<any>;
  numComments: number;

  constructor(public afDB: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
    firebase.auth().onAuthStateChanged(function(user) {
      if(!user) navCtrl.setRoot(LoginPage);
    });
    this.datosVarios = afDB.object('/datos', {preserveSnapshot: true});
    this.datosVarios.subscribe(subs =>{
      this.numComments = subs.val().numComments;
    });    
  }


}
