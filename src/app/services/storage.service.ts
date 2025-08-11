import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private imgbbApiKey = 'no';
  private http = inject(HttpClient)

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

  async uploadBase64Image(base64: string): Promise<string> {
    const formData = new FormData();
    const pureBase64 = base64.split(',')[1];

    formData.append('image', pureBase64);

    try {
      const response = await firstValueFrom(
          this.http.post<any>(`https://api.imgbb.com/1/upload?key=${this.imgbbApiKey}`, formData)
      );
      return response.data.url;
    } catch (error) {
      console.error('Error subiendo imagen a ImgBB:', error);
      throw error;
    }
  }


}
