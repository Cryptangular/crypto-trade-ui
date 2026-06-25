import { inject, Injectable } from '@angular/core';
import { StxApiService } from '../../../../core/services/stx-api/stx-api-service';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { BinanceKlineRaw, CandlestickData } from '../models/stx-trade-model';
import { Time } from 'lightweight-charts';

@Injectable({
  providedIn: 'root',
})
export class StxTradeApiService {
  private api = inject(StxApiService);

  getHistoricalKlines(symbol: string, interval: string): Observable<CandlestickData[]> {
    const params = new HttpParams().set('symbol', symbol.toUpperCase()).set('interval', interval);

    return this.api.get<BinanceKlineRaw[]>('/api/v3/klines', params).pipe(
      map(data =>
        data.map(kline => ({
          time: Math.floor(kline[0] / 1000) as Time,
          open: parseFloat(kline[1]),
          high: parseFloat(kline[2]),
          low: parseFloat(kline[3]),
          close: parseFloat(kline[4]),
        }))
      )
    );
  }
}
