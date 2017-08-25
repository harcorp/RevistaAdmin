import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarPublicacionPage } from './agregar-publicacion';

@NgModule({
  declarations: [
    AgregarPublicacionPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarPublicacionPage),
  ],
})
export class AgregarPublicacionPageModule {}
