import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the VideoIdPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'videoId',
})
export class VideoIdPipe implements PipeTransform {

  transform(value, args) {
    if(value != null){
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
      var match = value.match(regExp);
      return (match&&match[7].length==11)? match[7] : 'false';
    }
  }
}
