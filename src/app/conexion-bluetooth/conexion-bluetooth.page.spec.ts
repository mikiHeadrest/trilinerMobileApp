import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConexionBluetoothPage } from './conexion-bluetooth.page';

describe('ConexionBluetoothPage', () => {
  let component: ConexionBluetoothPage;
  let fixture: ComponentFixture<ConexionBluetoothPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ConexionBluetoothPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
