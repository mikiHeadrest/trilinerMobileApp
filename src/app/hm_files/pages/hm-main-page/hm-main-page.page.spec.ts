import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HMMainPagePage } from './hm-main-page.page';

describe('HMMainPagePage', () => {
  let component: HMMainPagePage;
  let fixture: ComponentFixture<HMMainPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HMMainPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
