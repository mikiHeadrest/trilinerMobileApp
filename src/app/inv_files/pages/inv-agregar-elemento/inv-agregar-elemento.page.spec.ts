import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvAgregarElementoPage } from './inv-agregar-elemento.page';

describe('InvAgregarElementoPage', () => {
  let component: InvAgregarElementoPage;
  let fixture: ComponentFixture<InvAgregarElementoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvAgregarElementoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
