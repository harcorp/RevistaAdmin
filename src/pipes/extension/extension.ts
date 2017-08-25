import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the ExtensionPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'extension',
})
export class ExtensionPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    if(value != null){
      var re = /(?:\.([^.]+))?$/;
      return re.exec(value)[1];        
    }
  }
}
