import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseObjectObservable, AngularFireDatabase } from "angularfire2/database";

@Pipe({
  name: 'articuloName',
})
export class ArticuloNamePipe implements PipeTransform {
  
  objeto: FirebaseObjectObservable<any>;
  constructor(public afDB: AngularFireDatabase){

  }
  transform(value, args) {
    if(value != null){
      console.log(value);
      return new Promise(resolve => {
        this.objeto = this.afDB.object('articulos/' + value + '/titulo', { preserveSnapshot: true});
        this.objeto.subscribe(v => {
          console.log(v.val());
          resolve(v.val());
        });
      });
    }
  }
}
