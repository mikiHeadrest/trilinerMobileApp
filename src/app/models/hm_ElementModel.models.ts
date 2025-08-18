export interface HM_ElementModel{
  id_operacionProducto:number,

  id_producto:number,
  imagen:string,
  nombre:string,
  franquicia:string,

  tipo_operacion:boolean,
  // true: Despacho
  //false: Recepcion

  unidades:number,

  modified_at?:Date, //De Operacion-Producto
}
