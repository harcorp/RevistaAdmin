import { Pipe, PipeTransform } from '@angular/core';
import { FirebaseApp } from 'angularfire2';
import 'firebase/storage';

@Pipe({
  name: 'urlImage',
})
export class UrlImagePipe implements PipeTransform {

  constructor(private fb: FirebaseApp){
  }

  transform(value: string, args) {
    if(value != null){
      return new Promise(resolve => {
        this.fb.storage().ref().child(value).getDownloadURL()
          .then(v => {
            resolve(v);
          });
      })
    }
  }
}
