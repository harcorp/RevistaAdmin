import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AgregarCategoriaPage } from './agregar-categoria';

@NgModule({
  declarations: [
    AgregarCategoriaPage,
  ],
  imports: [
    IonicPageModule.forChild(AgregarCategoriaPage),
  ],
})
export class AgregarCategoriaPageModule {}
