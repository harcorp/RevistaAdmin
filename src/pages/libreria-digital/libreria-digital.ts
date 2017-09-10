import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ModalController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import { DetalleLibreriasPage } from "../detalle-librerias/detalle-librerias";
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { EditarLibreriaPage } from "../editar-libreria/editar-libreria";

@IonicPage()
@Component({
  selector: 'page-libreria-digital',
  templateUrl: 'libreria-digital.html',
})
export class LibreriaDigitalPage {

  articulos: FirebaseListObservable<any>;
  loader: any;

  constructor(public afDB: AngularFireDatabase, private loadingCtrl: LoadingController,
    private alertCtrl: AlertController, private fb: FirebaseApp,
    private toastCtrl: ToastController, private modalCtrl: ModalController,
    public navCtrl: NavController, public navParams: NavParams) {
    this.articulos = this.afDB.list('biblioteca_libreria', {
      query: {
        orderByChild: 'fecha'
      }
    });

  }

  agregar(){
    var type = 1;
    this.navCtrl.push(DetalleLibreriasPage, { type });
  }

  eliminar(key: string, file: string, thumbnail: string){
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
            this.eliminarFinal(key, file, thumbnail);
          }
        }
      ]
    });
    confirm.present();
  }

  eliminarFinal(key: string, file: string, thumbnail: string){
    this.presentLoading();
    this.fb.storage().ref().child(file).delete().then(
      ref => {
        this.fb.storage().ref().child(thumbnail).delete().then(v => {
          this.articulos.remove(key).then(resolve => {
            this.loader.dismiss();
            this.presentToast('Eliminado satisfactoriamente');
          });
        });
      });
  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    this.loader.present();
  }

  editar(uid: string, type: number){
    let modal = this.modalCtrl.create(EditarLibreriaPage, {articulo: uid, tipo: type});
    modal.present();
  }

}
