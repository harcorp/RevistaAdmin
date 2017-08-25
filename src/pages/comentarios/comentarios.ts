import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular'
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { FirebaseApp } from 'angularfire2';
import 'firebase/database';

@IonicPage()
@Component({
  selector: 'page-comentarios',
  templateUrl: 'comentarios.html',
})
export class ComentariosPage {

  comentarios: FirebaseListObservable<any>;
  loader: any;

  constructor(public afAuth: AngularFireAuth, public afDB: AngularFireDatabase,
    public fb: FirebaseApp, public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,public alertCtrl: AlertController,
    public navCtrl: NavController, public navParams: NavParams) {
      this.comentarios = this.afDB.list('comentarios');
  }


  aprobar(articulo: string, key: string, user: string){
    this.loader = this.loadingCtrl.create({
      content: "Procesando..."
    });
    this.loader.present();
    var updates = {};
    updates['/comentarios/' + articulo + '/' + key + '/aproved'] = true;
    updates['/user-comentarios/' + user + '/' + articulo + '/' + key + '/aproved'] = true;
    this.fb.database().ref().update(updates).then(v => {
      this.loader.dismiss();
      this.presentToast('Comentario Aprovado Correctamente');
    }).catch(dd => {
      this.loader.dismiss();
      this.presentToast('No se pudo aprobar el comentario. Intente de nuevo');
    });

    var upvotesRef = this.fb.database().ref('datos/numComments');
    upvotesRef.transaction(function (current_value) {
      return (current_value || 0)  - 1;
    });
  }

  eliminar(articulo: string, key: string, user: string, file: string = null, aproved: boolean = true){
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
            this.eliminarFinal(articulo, key, user, file, aproved);
          }
        }
      ]
    });
    confirm.present();
  }

  eliminarFinal(articulo: string, key: string, user: string, file: string = null, aproved: boolean){
    if(!aproved){
      var upvotesRef = this.fb.database().ref('datos/numComments');
      upvotesRef.transaction(function (current_value) {
        return (current_value || 0)  - 1;
      });
    }
    this.loader = this.loadingCtrl.create({
      content: "Procesando..."
    });
    this.loader.present();
    if(file != null){
      this.fb.storage().ref().child(file).delete();
    }
    var updates = {};
    updates['/comentarios/' + articulo + '/' + key] = null;
    updates['/user-comentarios/' + user + '/' + articulo + '/' + key] = null;
    this.fb.database().ref().update(updates).then(v => {
      this.loader.dismiss();
      this.presentToast('Comentario Borrado Correctamente');
    }).catch(dd => {
      this.loader.dismiss();
      this.presentToast('No se pudo eliminar el comentario');
    });
  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  signOut() {
    this.afAuth.auth.signOut();
  }

}
