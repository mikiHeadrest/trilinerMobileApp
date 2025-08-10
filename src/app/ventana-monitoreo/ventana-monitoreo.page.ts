import { Component, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonRouterOutlet, IonIcon} from '@ionic/angular/standalone';

@Component({
  selector: 'app-ventana-monitoreo',
  templateUrl: './ventana-monitoreo.page.html',
  styleUrls: ['./ventana-monitoreo.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonRouterOutlet, IonIcon]
})
export class VentanaMonitoreoPage implements OnInit {

  constructor() {}

  ngOnInit() {
  }

}
