import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VentanaPrinicpalPage } from './ventana-prinicpal.page';

describe('VentanaPrinicpalPage', () => {
  let component: VentanaPrinicpalPage;
  let fixture: ComponentFixture<VentanaPrinicpalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(VentanaPrinicpalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
