import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading, AlertController, ViewController, ToastController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { AngularFireAuth } from "angularfire2/auth";
import {AngularFireDatabase } from 'angularfire2/database'
import { DashboardPage } from "../dashboard/dashboard";
import * as firebase from 'firebase/app';

@IonicPage({
  segment: 'ingresar'
})
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public navParams: NavParams,
        public authData: AuthProvider, public formBuilder: FormBuilder,
        public viewCtrl: ViewController, public afAuth: AngularFireAuth,
        public toastCtrl: ToastController,public afDB: AngularFireDatabase,
        public alertCtrl: AlertController, public loadingCtrl: LoadingController) {
      
      firebase.auth().onAuthStateChanged(function(user) {
        if(user) navCtrl.setRoot(DashboardPage);
      });
      this.loginForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.minLength(6), Validators.required])]
      });
  }

  loginUser(){
      if (!this.loginForm.valid){
      } else if(this.loginForm.value.email != 'rev.planteamientoseneducacion@epe.edu.co'){
        let toast = this.toastCtrl.create({
          message: 'Correo de ingreso no valido',
          duration: 3000
        });
        toast.present();
      } else {
        this.loading = this.loadingCtrl.create({
          dismissOnPageChange: true,
        });
        this.loading.present();
        this.authData.loginUser(this.loginForm.value.email, this.loginForm.value.password)
        .then( authData => {
          let toast = this.toastCtrl.create({
            message: 'Ingreso correcto',
            duration: 3000
          });
          toast.present();
          this.navCtrl.setRoot(DashboardPage);
        }, error => {
          this.loading.dismiss().then( () => {
            let alert = this.alertCtrl.create({
              message: error.message,
              buttons: [
                {
                  text: "Ok",
                  role: 'cancel'
                }
              ]
            });
            alert.present();
          });
        });
      }
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPassswordPage');
  }

}
