export class Articulo {
    parent: string;
    descripcion: string;
    thumbnail: any;
    timestamp: number = Date.now() / 1000 * -1;
    titulo: string;
    video: string;
}