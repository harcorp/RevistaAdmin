export class Publicacion{
    category: string;
    count: number;
    descripcion: string;
    timestamp: number = Date.now() / 1000 * -1;
    titulo: string;
}