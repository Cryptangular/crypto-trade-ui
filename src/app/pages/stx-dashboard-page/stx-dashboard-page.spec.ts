import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StxDashboardPage } from './stx-dashboard-page';

describe('StxDashboardPage', () => {
  let component: StxDashboardPage;
  let fixture: ComponentFixture<StxDashboardPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StxDashboardPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
