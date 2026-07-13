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
import { Observable, of } from 'rxjs';
import { StxPriceChart } from './stx-price-chart';
import { StxTradeApiService } from '../../services/stx-trade-api-service';
import { KlineData } from '../../models/stx-trade-model';

describe('StxPriceChart', () => {
  let component: StxPriceChart;
  let fixture: ComponentFixture<StxPriceChart>;

  const tradeApiMock = {
    getHistoricalKlines: (): Observable<KlineData[]> => of([]),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StxPriceChart],
      providers: [{ provide: StxTradeApiService, useValue: tradeApiMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(StxPriceChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
