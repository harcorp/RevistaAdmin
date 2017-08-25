import { NgModule } from '@angular/core';
import { ValuesPipe } from './../pipes/values/values';
import { ExtensionPipe } from './../pipes/extension/extension';
import { UrlImagePipe } from './../pipes/url-image/url-image';
import { VideoIdPipe } from './../pipes/video-id/video-id';
import { DisplayNamePipe } from './../pipes/display-name/display-name';
import { PubNamePipe } from './../pipes/pub-name/pub-name';
import { ArticuloNamePipe } from './../pipes/articulo-name/articulo-name';
import { YoutubePipe } from './../pipes/youtube/youtube';
@NgModule({
	declarations: [ValuesPipe,
    ExtensionPipe,
    UrlImagePipe,
    VideoIdPipe,
    DisplayNamePipe,
    PubNamePipe,
    ArticuloNamePipe,
    YoutubePipe],
	imports: [],
	exports: [ValuesPipe,
    ExtensionPipe,
    UrlImagePipe,
    VideoIdPipe,
    DisplayNamePipe,
    PubNamePipe,
    ArticuloNamePipe,
    YoutubePipe]
})
export class PipesModule {}
