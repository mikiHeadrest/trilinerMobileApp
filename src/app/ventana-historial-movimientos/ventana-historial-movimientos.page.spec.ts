import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentanaHistorialMovimientosPage } from './ventana-historial-movimientos.page';

describe('VentanaHistorialMovimientosPage', () => {
  let component: VentanaHistorialMovimientosPage;
  let fixture: ComponentFixture<VentanaHistorialMovimientosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaHistorialMovimientosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
