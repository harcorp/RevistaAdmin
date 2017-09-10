import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Libreria } from "../../models/libreria";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-editar-libreria',
  templateUrl: 'editar-libreria.html',
})
export class EditarLibreriaPage {

  uid: string;
  art: FirebaseObjectObservable<any>;
  articulo: Libreria = new Libreria;
  formulario: FormGroup;
  type: number;

  constructor(private afDB: AngularFireDatabase, private formBuilder: FormBuilder,
    private viewCtrl: ViewController, private toastCtrl: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {

    this.uid = this.navParams.get('articulo');
    this.type = this.navParams.get('tipo');
    console.log(this.type);
    if(this.type == 1){
      this.art = this.afDB.object('biblioteca_articulos/' + this.uid, { preserveSnapshot: true});
      this.art.subscribe(v => {
        this.articulo = v.val();
      });      
    }else if(this.type == 2){
      this.art = this.afDB.object('biblioteca_libreria/' + this.uid, { preserveSnapshot: true}); 
      this.art.subscribe(v => {
        this.articulo = v.val();
      });     
    }



    this.formulario = this.formBuilder.group({
      nombre: ['', Validators.compose([Validators.required])],
      descripcion: ['', Validators.compose([Validators.required])],
    });
  }

  update(){
    this.art.update({
      nombre: this.formulario.value.nombre,
      descripcion: this.formulario.value.descripcion
    }).then(v => {
      this.presentToast('Actualización Correcta');
      this.dismiss();
    }).catch(err => {
      this.presentToast('La actualización no se pudo realizar. Intente de nuevo');
      this.dismiss();
    });
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

  presentToast(mensaje: string) {
    let toast = this.toastCtrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }


}
