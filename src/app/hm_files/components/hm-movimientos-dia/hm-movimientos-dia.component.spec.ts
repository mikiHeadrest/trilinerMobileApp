import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { HMMovimientosDiaComponent } from './hm-movimientos-dia.component';

describe('HMMovimientosDiaComponent', () => {
  let component: HMMovimientosDiaComponent;
  let fixture: ComponentFixture<HMMovimientosDiaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HMMovimientosDiaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(HMMovimientosDiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
