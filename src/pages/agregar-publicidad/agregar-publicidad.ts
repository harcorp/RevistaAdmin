import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Banners } from "../../models/banners";
import { AngularFireDatabase, FirebaseListObservable } from "angularfire2/database";
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { UUID } from 'angular2-uuid';

@IonicPage()
@Component({
  selector: 'page-agregar-publicidad',
  templateUrl: 'agregar-publicidad.html',
})
export class AgregarPublicidadPage {

  banner = new Banners;
  listBanners: FirebaseListObservable<any>;

  constructor(public afDB: AngularFireDatabase, public toastCtrl: ToastController,
    public loadingCtrl: LoadingController, public fb: FirebaseApp,
    public navCtrl: NavController, public navParams: NavParams) {

      this.listBanners = this.afDB.list('banners');
  }

  fileEvent(fileInput: any){
    let file = fileInput.target.files[0];
    this.banner.image = file;
  }

  cargar(){
    if(this.banner.image == undefined){
      this.presentToast('Debe cargar una imagen');
    }else if(this.banner.type == null){
      this.presentToast('Debe seleccionar un tipo de banner');
    }else{
      let loader = this.loadingCtrl.create({
        content: "Cargando...",
        dismissOnPageChange: true
      });
      loader.present();
      let uuid = UUID.UUID();
      var filename = '/banners/' + uuid + '/' + this.banner.image.name;      
      this.fb.storage().ref(filename).put(this.banner.image).then(resultado => {
      this.banner.image = filename;
      this.banner.imageURL = resultado.downloadURL;
      this.listBanners.push(this.banner).then(result => {
          loader.dismiss();
          this.presentToast('Se cargo exitosamente el archivo.');
          this.navCtrl.pop();
        });
      });
    }
  }


  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }
}
