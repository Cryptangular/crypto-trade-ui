import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxLoadingOverlay } from './stx-loading-overlay';

describe('StxLoadingOverlay', () => {
  let component: StxLoadingOverlay;
  let fixture: ComponentFixture<StxLoadingOverlay>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxLoadingOverlay],
    }).compileComponents();

    fixture = TestBed.createComponent(StxLoadingOverlay);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
