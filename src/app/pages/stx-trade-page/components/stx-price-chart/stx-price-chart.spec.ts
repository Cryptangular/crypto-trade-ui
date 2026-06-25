if (typeof globalThis !== 'undefined') {
  Object.defineProperty(globalThis, 'matchMedia', {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
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

import { StxPriceChart } from './stx-price-chart';

describe('StxPriceChart', () => {
  let component: StxPriceChart;
  let fixture: ComponentFixture<StxPriceChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxPriceChart],
    }).compileComponents();

    fixture = TestBed.createComponent(StxPriceChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
