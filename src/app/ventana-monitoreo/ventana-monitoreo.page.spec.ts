import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentanaMonitoreoPage } from './ventana-monitoreo.page';

describe('VentanaMonitoreoPage', () => {
  let component: VentanaMonitoreoPage;
  let fixture: ComponentFixture<VentanaMonitoreoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaMonitoreoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
