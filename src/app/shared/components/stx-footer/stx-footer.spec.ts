import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxFooter } from './stx-footer';

describe('StxFooter', () => {
  let component: StxFooter;
  let fixture: ComponentFixture<StxFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(StxFooter);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
