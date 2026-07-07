import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxPotfolioPage } from './stx-potfolio-page';

describe('StxPotfolioPage', () => {
  let component: StxPotfolioPage;
  let fixture: ComponentFixture<StxPotfolioPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxPotfolioPage],
    }).compileComponents();

    fixture = TestBed.createComponent(StxPotfolioPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
