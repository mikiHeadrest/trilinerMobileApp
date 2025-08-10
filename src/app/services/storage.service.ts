import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {
    if(sessionStorage.getItem("inv-router")){
      this.lengthOfInventory = parseInt(sessionStorage.getItem("inv-router") as string);
      console.log("Actualidado por session storage:" + this.lengthOfInventory)
    }
   }

  // Inventario - Datos Importantes
  private lengthOfInventory:number = 0;

  getLengthOfInventroy(){
    return this.lengthOfInventory
  }

  setLengthOfInventory(length:number){
    sessionStorage.removeItem("inv-maxLength")
    this.lengthOfInventory = length;

    console.log("length to string: " +length.toString())

    sessionStorage.setItem("inv-router", length.toString() )
  }


}
