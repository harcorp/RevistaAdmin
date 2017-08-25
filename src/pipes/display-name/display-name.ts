import { Pipe, PipeTransform } from '@angular/core';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';

@Pipe({
  name: 'displayName',
})
export class DisplayNamePipe implements PipeTransform {

  objeto: FirebaseObjectObservable<any>;
  constructor(public afDB: AngularFireDatabase){

  }
  transform(value, args) {
    if(value != null){
      return new Promise(resolve => {
        this.objeto = this.afDB.object('users/' + value + '/nombre', { preserveSnapshot: true});
        this.objeto.subscribe(v => {
          resolve(v.val());
        });
      });
    }
  }
}
