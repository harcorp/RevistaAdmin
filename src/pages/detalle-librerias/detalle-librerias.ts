import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController } from 'ionic-angular';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
import { Libreria } from "../../models/libreria";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';
import { UUID } from 'angular2-uuid';


@IonicPage({
  segment: '/libreria/agregar'
})
@Component({
  selector: 'page-detalle-librerias',
  templateUrl: 'detalle-librerias.html',
})
export class DetalleLibreriasPage {

  type: number;
  biblioteca: FirebaseListObservable<any>;

  libreria: Libreria = new Libreria;

  formulario: FormGroup;
  
  constructor(public afDB: AngularFireDatabase, private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private fb: FirebaseApp, private formBulder: FormBuilder,
    public navCtrl: NavController, public navParams: NavParams) {

      this.formulario = this.formBulder.group({
        nombre: ['', Validators.compose([Validators.required])],
        descripcion: ['', Validators.compose([Validators.required])],
        thumbnail: ['', Validators.compose([Validators.required])],
        url: ['', Validators.compose([Validators.required])],
      });
  }

  ionViewDidLoad() {
    this.type = this.navParams.get('type');
    if(this.type == 1){
      this.biblioteca = this.afDB.list('/biblioteca_libreria/');
    }else{
      this.biblioteca = this.afDB.list('/biblioteca_articulos/');      
    }
  }

  fileEvent2(fileInput: any){
    let thumbnail = fileInput.target.files[0];
    this.libreria.thumbnail = thumbnail;
  }

  cargar(){
      if (!this.formulario.valid && this.libreria.thumbnail == undefined){
        this.presentToast('Complete el formulario');
      } else {
        this.carga2();
      }
  }

  carga2(){
    let loader = this.loadingCtrl.create({
      content: "Cargando...",
      dismissOnPageChange: true
    });
    loader.present();
    let uuid = UUID.UUID();      
    var filenameThumb = '/imagen/' + uuid + '/' + this.libreria.thumbnail.name;            
    this.fb.storage().ref(filenameThumb).put(this.libreria.thumbnail).then(resultado => {  
      this.libreria.thumbnail = filenameThumb;
      this.biblioteca.push(this.libreria).then(result => {
          loader.dismiss();
          this.presentToast('Se cargo exitosamente el archivo.');
          this.navCtrl.pop();
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

  getType(value: string){
    if(value != null){
      var re = /(?:\.([^.]+))?$/;
      return re.exec(value)[1];        
    }
  }
}
