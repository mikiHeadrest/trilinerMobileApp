import { computed, effect, Injectable, signal } from '@angular/core';

export type ProductoSeleccionado = {
  idProducto: string,
  cantidad: number
}

@Injectable({
  providedIn: 'root'
})
export class OperacionService {
  private _productos = signal<ProductoSeleccionado[]>([]);
  llaveStorage: string = "operacion";

  productos = computed(() => this._productos());

  constructor() { 
    effect(() => {
      localStorage.setItem(this.llaveStorage, JSON.stringify(this._productos()));
    });
  }

  agregarProducto(idProducto: string, cantidad: number) {
    const productosActuales = this._productos();
    const indice = productosActuales.findIndex(p => p.idProducto === idProducto);

    if (indice >= 0) {
      const copia = [...productosActuales];
      copia[indice] = {
        ...copia[indice],
        cantidad: copia[indice].cantidad + cantidad
      };
      this._productos.set(copia);
    } else {
      this._productos.set([...productosActuales, { idProducto, cantidad }]);
    }
  }

  eliminarProducto(idProducto: string) {
    this._productos.set(this._productos().filter(p => p.idProducto !== idProducto));
  }

  vaciarCarrito() {
    this._productos.set([]);
  }
}
