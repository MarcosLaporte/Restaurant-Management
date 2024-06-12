export class Producto {
  id: string;
  nombre: string;
  descripcion: string;
  tiempoElab: number; // Combined time in seconds
  precio: number;
  fotosUrl: string[];
  codigoQr: string;

  constructor(id: string, nombre: string, descripcion: string, tiempoElab: number, precio: number,
      fotosUrl: string[], codigoQr: string) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.tiempoElab = tiempoElab;
    this.precio = precio;
    this.fotosUrl = fotosUrl;
    this.codigoQr = codigoQr;
  }
}
