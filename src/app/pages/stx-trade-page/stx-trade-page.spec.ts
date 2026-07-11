if (typeof globalThis !== 'undefined') {
  Object.defineProperty(globalThis, 'matchMedia', {
    writable: true,
    value: (_query: string) => ({
      matches: false,
      media: _query,
      onchange: null,
      addListener: (): void => {},
      removeListener: (): void => {},
      addEventListener: (): void => {},
      removeEventListener: (): void => {},
      dispatchEvent: (): boolean => false,
    }),
  });
}

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { StxTradePage } from './stx-trade-page';

describe('StxTradePage', () => {
  let component: StxTradePage;
  let fixture: ComponentFixture<StxTradePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxTradePage],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(StxTradePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
