import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxPotfolioPage } from './stx-potfolio-page';

describe('StxPotfolioPage', () => {
  let component: StxPotfolioPage;
  let fixture: ComponentFixture<StxPotfolioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StxPotfolioPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
