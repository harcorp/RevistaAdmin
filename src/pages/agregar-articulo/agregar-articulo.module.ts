import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarArticuloPage } from './agregar-articulo';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    AgregarArticuloPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarArticuloPage),
    PipesModule
  ],
})
export class AgregarArticuloPageModule {}
