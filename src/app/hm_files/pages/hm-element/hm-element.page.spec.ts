import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HMElementPage } from './hm-element.page';

describe('HMElementPage', () => {
  let component: HMElementPage;
  let fixture: ComponentFixture<HMElementPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HMElementPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
