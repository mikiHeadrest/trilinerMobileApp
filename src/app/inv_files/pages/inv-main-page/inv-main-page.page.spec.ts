import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InvMainPagePage } from './inv-main-page.page';

describe('InvMainPagePage', () => {
  let component: InvMainPagePage;
  let fixture: ComponentFixture<InvMainPagePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(InvMainPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
