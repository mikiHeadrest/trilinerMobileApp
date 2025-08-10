import { ComponentFixture, TestBed } from '@angular/core/testing';
import { McMainPagePage } from './mc-main-page.page';

describe('McMainPagePage', () => {
  let component: McMainPagePage;
  let fixture: ComponentFixture<McMainPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(McMainPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
