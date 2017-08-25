import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleLibreriasPage } from './detalle-librerias';

@NgModule({
  declarations: [
    DetalleLibreriasPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleLibreriasPage),
  ],
})
export class DetalleLibreriasPageModule {}
