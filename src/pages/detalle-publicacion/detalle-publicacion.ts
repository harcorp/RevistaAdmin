import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2/database';
import { Publicacion } from "../../models/publicacion";
import { DetalleArticulosPage } from "../detalle-articulos/detalle-articulos";

@IonicPage()
@Component({
  selector: 'page-detalle-publicacion',
  templateUrl: 'detalle-publicacion.html',
})
export class DetallePublicacionPage {

  uid: string;
  publicacion: FirebaseObjectObservable<any>;
  pubPerm: FirebaseObjectObservable<any>;
  articulos: FirebaseListObservable<any>;
  pub: Publicacion = new Publicacion;
  loader: any;
  editar: boolean = false;
  categorias: FirebaseListObservable<any>;    

  constructor(private afDB: AngularFireDatabase, private alertCtrl: AlertController,
    private loadingCtrl: LoadingController, private toastCtrl: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {

    this.categorias = this.afDB.list('category_pub');      
  }
  
  verMas(pubId: string, articuloId: string ){
    this.navCtrl.push(DetalleArticulosPage, { pubId , articuloId});
  }

  ionViewDidLoad() {
   this.uid = this.navParams.get('uid');
   this.publicacion = this.afDB.object('publicaciones/' + this.uid);
   this.pubPerm = this.afDB.object('publicaciones/' + this.uid,{ preserveSnapshot: true});
   this.articulos = this.afDB.list('articulos/' + this.uid);
   
   this.pubPerm.subscribe(prueba => {
     if(prueba.val() != null)
      this.pub = prueba.val();
   });
  }

  switchEditar(){
    this.editar = !this.editar;
  }


  eliminar(){
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
            this.eliminarFinal();
          }
        }
      ]
    });
    confirm.present();
  }

  guardar(){
    if(this.pub.titulo == ''){
      this.presentToast('El titulo no puede estar vacio');
    }else if(this.pub.descripcion == ''){
      this.presentToast('La descripcion no puede estar vacia');
    }else{
      this.presentLoading();
      this.publicacion.set(this.pub).then(result => {
        this.loader.dismiss();
        this.switchEditar();
        this.presentToast('Publicación actualizada');        
      });
    }
  }

  eliminarFinal(){
    this.presentLoading();
      this.publicacion.remove().then(resolve => {
        this.navCtrl.pop();
        this.loader.dismiss();
        this.presentToast('Eliminado satisfactoriamente');
      });
  }

  presentLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Cargando..."
    });
    this.loader.present();
  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

}
