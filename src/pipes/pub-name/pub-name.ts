import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
/**
 * Generated class for the PubNamePipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'pubName',
})
export class PubNamePipe implements PipeTransform {

  objeto: FirebaseObjectObservable<any>;
  constructor(public afDB: AngularFireDatabase){

  }
  transform(value, args) {
    if(value != null){
      return new Promise(resolve => {
        this.objeto = this.afDB.object('publicaciones/' + value + '/titulo', { preserveSnapshot: true});
        this.objeto.subscribe(v => {
          console.log(v.val());
          resolve(v.val());
        });
      });
    }
  }
}