import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentanaInventarioPage } from './ventana-inventario.page';

describe('VentanaInventarioPage', () => {
  let component: VentanaInventarioPage;
  let fixture: ComponentFixture<VentanaInventarioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaInventarioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
