import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonIcon, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personCircleOutline } from 'ionicons/icons';


@Component({
  selector: 'app-ventana-config',
  templateUrl: './ventana-config.page.html',
  styleUrls: ['./ventana-config.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonIcon]
})
export class VentanaConfigPage implements OnInit {

  alumnosMeca:string[] = [
    "Ontíveros Rodriguez José",
    "Castelo Acevedo Jesús Manuel",
    "Moreno Urquizu Jesús Guillermo",
    "Gerardo Rangel García Jesús",
    "Osuna Sánchez Genaro Josué",
    "Vizcarra Ríos Diego Eduardo",
    "Sanchez Diaz Martin Gonzalo"
  ]

  alumnosInfo:string[] = [
    "Valdez Lerma Juan Manuel",
    "Avendaño Velarde Daniel",
    "Guerra Perez Roberto",
    "Casillas Navarro Daniel Omar",
    "Aguirre Ibarra Zyon Luis",
    "Lopez Lopez Miguel Angel"
  ]

  constructor() {
    addIcons({personCircleOutline});
  }

  ngOnInit() {
  }

}
