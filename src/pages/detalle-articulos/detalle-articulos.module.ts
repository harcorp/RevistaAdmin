import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleArticulosPage } from './detalle-articulos';

@NgModule({
  declarations: [
    DetalleArticulosPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleArticulosPage),
  ],
})
export class DetalleArticulosPageModule {}
