import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Publicacion } from "../../models/publicacion";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { DetalleArticulosPage } from "../detalle-articulos/detalle-articulos";

@IonicPage()
@Component({
  selector: 'page-agregar-publicacion',
  templateUrl: 'agregar-publicacion.html',
})
export class AgregarPublicacionPage {


  publicacion: Publicacion = new Publicacion;
  pub: FirebaseListObservable<any>;
  categorias: FirebaseListObservable<any>;
  formulario: FormGroup;

  constructor(private formBuilder: FormBuilder, private toastCtrl: ToastController,
    private afDB: AngularFireDatabase, private loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams) {

      this.formulario = this.formBuilder.group({
        titulo: ['', Validators.compose([Validators.required])],
        descripcion: ['', Validators.compose([Validators.required])],
        category: ['', Validators.compose([Validators.required])],
      });

      this.pub = this.afDB.list('publicaciones');
      this.categorias = this.afDB.list('category_pub');
  }

  verMas(pubId: string, articuloId: string ){
    this.navCtrl.push(DetalleArticulosPage, { pubId , articuloId});
  }

  cargar(){
    if (!this.formulario.valid){
      this.presentToast('Complete el formulario');
    } else {
      let loader = this.loadingCtrl.create({
        content: "Cargando...",
        dismissOnPageChange: true
      });
      loader.present();
      this.pub.push(this.publicacion).then(result => {
        loader.dismiss();
        this.presentToast('Se publico correctamente');
        this.navCtrl.pop();
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
