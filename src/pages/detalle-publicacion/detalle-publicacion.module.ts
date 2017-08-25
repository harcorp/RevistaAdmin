import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetallePublicacionPage } from './detalle-publicacion';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    DetallePublicacionPage,
  ],
  imports: [
    IonicPageModule.forChild(DetallePublicacionPage),
    PipesModule
  ],
})
export class DetallePublicacionPageModule {}
