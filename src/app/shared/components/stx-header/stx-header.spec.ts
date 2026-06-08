import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxHeader } from './stx-header';

describe('StxHeader', () => {
  let component: StxHeader;
  let fixture: ComponentFixture<StxHeader>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxHeader],
    }).compileComponents();

    fixture = TestBed.createComponent(StxHeader);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
