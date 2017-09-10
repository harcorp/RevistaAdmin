import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { LoginPage } from "../pages/login/login";
import { AuthProvider } from '../providers/auth/auth';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { DashboardPage } from "../pages/dashboard/dashboard";
import { LibreriaArticulosPage } from "../pages/libreria-articulos/libreria-articulos";
import { ArticulosPage } from "../pages/articulos/articulos";
import { PublicacionesPage } from "../pages/publicaciones/publicaciones";
import { LibreriaDigitalPage } from "../pages/libreria-digital/libreria-digital";
import { ComentariosPage } from "../pages/comentarios/comentarios";
import { PipesModule } from "../pipes/pipes.module";
import { DetalleLibreriasPage } from "../pages/detalle-librerias/detalle-librerias";
import { DetallePublicacionPage } from "../pages/detalle-publicacion/detalle-publicacion";
import { DetalleArticulosPage } from "../pages/detalle-articulos/detalle-articulos";
import { FileChooser } from "@ionic-native/file-chooser";
import { FilePath } from "@ionic-native/file-path";
import { AgregarPublicacionPage } from "../pages/agregar-publicacion/agregar-publicacion";
import { AgregarArticuloPage } from "../pages/agregar-articulo/agregar-articulo";
import { PublicidadPage } from "../pages/publicidad/publicidad";
import { AgregarPublicidadPage } from "../pages/agregar-publicidad/agregar-publicidad";
import { EditarLibreriaPage } from "../pages/editar-libreria/editar-libreria";

export const firebaseConfig = {
  apiKey: "AIzaSyB0f-eM3Eq-_V960Re-sOGlj_YA8HGvSpw",
  authDomain: "revista-digital-bb5d4.firebaseapp.com",
  databaseURL: "https://revista-digital-bb5d4.firebaseio.com",
  projectId: "revista-digital-bb5d4",
  storageBucket: "revista-digital-bb5d4.appspot.com",
  messagingSenderId: "17548864478"
};

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    DashboardPage,
    PublicacionesPage,
    ArticulosPage,
    LibreriaArticulosPage,
    LibreriaDigitalPage,
    ComentariosPage,
    DetalleLibreriasPage,
    DetalleArticulosPage,
    DetallePublicacionPage,
    AgregarPublicacionPage,
    AgregarArticuloPage,
    PublicidadPage,
    AgregarPublicidadPage,
    EditarLibreriaPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    PipesModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    DashboardPage,
    PublicacionesPage,
    ArticulosPage,
    LibreriaArticulosPage,
    LibreriaDigitalPage,
    ComentariosPage,
    DetalleLibreriasPage,
    DetalleArticulosPage,
    DetallePublicacionPage,
    AgregarPublicacionPage,
    AgregarArticuloPage,
    PublicidadPage,
    AgregarPublicidadPage,
    EditarLibreriaPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    FileChooser,
    FilePath,
  ]
})
export class AppModule {}
