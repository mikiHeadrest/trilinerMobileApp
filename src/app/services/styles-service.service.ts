import { Injectable, signal, WritableSignal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StylesServiceService {

  constructor() { }

  private headerTitle:WritableSignal<string> = signal("default");

  getHeaderTitle(){
    return this.headerTitle();
  }

  setHeaderTitle(header:string){
    this.headerTitle.set(header);
  }

  // Styles for inventroy
  private inv_AddButton: WritableSignal<boolean> = signal(false)

  getInvAddButton():boolean{
    return this.inv_AddButton()
  }

  setInvAddButton(isEnabled:boolean){
    this.inv_AddButton.set(isEnabled);
  }

}
