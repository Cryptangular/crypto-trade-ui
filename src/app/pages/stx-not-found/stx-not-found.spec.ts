import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxNotFound } from './stx-not-found';
import { provideRouter } from '@angular/router';

describe('StxNotFound', () => {
  let component: StxNotFound;
  let fixture: ComponentFixture<StxNotFound>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxNotFound],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StxNotFound);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
