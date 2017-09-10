import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditarLibreriaPage } from './editar-libreria';

@NgModule({
  declarations: [
    EditarLibreriaPage,
  ],
  imports: [
    IonicPageModule.forChild(EditarLibreriaPage),
  ],
})
export class EditarLibreriaPageModule {}
