import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-agregar-categoria',
  templateUrl: 'agregar-categoria.html',
})
export class AgregarCategoriaPage {

  categoria: any;
  categorias: FirebaseListObservable<any>;
  loader: any;

  constructor(private viewCtrl: ViewController, private afDB: AngularFireDatabase,
    private toastCtrl: ToastController, private loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {

      this.categorias = this.afDB.list('category_pub');
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  crear(){
    if(this.categoria != ""){
      this.presentLoading();
      this.categorias.push({nombre: this.categoria}).then(v => {
        this.presentToast('Categoría creada correctamente.');
        this.loader.dismiss();
        this.dismiss();
      })
    }else{
      this.presentLoading();
      this.presentToast('No debe estar vacia.');
    }
  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  presentLoading(){
    this.loader = this.loadingCtrl.create({
      content: "Creando...",
    });
    this.loader.present();
  }

}
