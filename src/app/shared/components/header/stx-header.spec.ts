import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { StxHeader } from './stx-header';

describe('Header', () => {
  let component: StxHeader;
  let fixture: ComponentFixture<StxHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxHeader],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StxHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
