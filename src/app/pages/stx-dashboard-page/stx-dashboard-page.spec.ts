import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxDashboardPage } from './stx-dashboard-page';

describe('StxDashboardPage', () => {
  let component: StxDashboardPage;
  let fixture: ComponentFixture<StxDashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxDashboardPage],
    }).compileComponents();

    fixture = TestBed.createComponent(StxDashboardPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
