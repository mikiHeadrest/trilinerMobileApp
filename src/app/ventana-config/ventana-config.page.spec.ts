import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentanaConfigPage } from './ventana-config.page';

describe('VentanaConfigPage', () => {
  let component: VentanaConfigPage;
  let fixture: ComponentFixture<VentanaConfigPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaConfigPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
