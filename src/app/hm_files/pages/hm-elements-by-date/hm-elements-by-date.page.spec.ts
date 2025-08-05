import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HMElementsByDatePage } from './hm-elements-by-date.page';

describe('HMElementsByDatePage', () => {
  let component: HMElementsByDatePage;
  let fixture: ComponentFixture<HMElementsByDatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HMElementsByDatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
