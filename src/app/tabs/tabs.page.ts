import { Component, EnvironmentInjector, inject } from '@angular/core';
import { IonTabs, IonTabBar, IonTabButton, IonIcon} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { cog, desktop, home, folder, time } from 'ionicons/icons';
import { StylesServiceService } from '../services/styles-service.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  imports: [IonTabs, IonTabBar, IonTabButton, IonIcon],
})
export class TabsPage {
  public environmentInjector = inject(EnvironmentInjector);
  private stylesService = inject(StylesServiceService)

  constructor() {
    addIcons({ time, folder, home, desktop, cog});
  }


}
