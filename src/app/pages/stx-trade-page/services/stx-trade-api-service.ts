import { inject, Injectable } from '@angular/core';
import { StxApiService } from '../../../../core/services/stx-api/stx-api-service';
import { map, Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { KlineData } from '../models/stx-trade-model';
import { Time } from 'lightweight-charts';

@Injectable()
export class StxTradeApiService {
  private api = inject(StxApiService);

  getHistoricalKlines(symbol: string, interval: string): Observable<KlineData[]> {
    const params = new HttpParams().set('symbol', symbol.toUpperCase()).set('interval', interval);

    return this.api
      .get<KlineData[]>('/trade/klines', params)
      .pipe(map(data => data.map(kline => ({ ...kline, time: kline.time as Time }))));
  }
}
