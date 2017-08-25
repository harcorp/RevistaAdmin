import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LibreriaArticulosPage } from './libreria-articulos';

@NgModule({
  declarations: [
    LibreriaArticulosPage,
  ],
  imports: [
    IonicPageModule.forChild(LibreriaArticulosPage),
  ],
})
export class LibreriaArticulosPageModule {}
