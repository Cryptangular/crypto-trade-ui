import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StxNotFoundPage } from './stx-not-found-page';
import { provideRouter } from '@angular/router';

describe('StxNotFoundPage', () => {
  let component: StxNotFoundPage;
  let fixture: ComponentFixture<StxNotFoundPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxNotFoundPage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StxNotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
