import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MarketQueryParams, MarketResponse } from '../types/markets.types';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MarketsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tokens`;

  getMarketData(params: MarketQueryParams): Observable<MarketResponse> {
    let httpParams = new HttpParams().set('page', params.page.toString()).set('limit', params.limit.toString());

    if (params.sortBy && params.sortOrder) {
      httpParams = httpParams.set('sortBy', params.sortBy).set('sortOrder', params.sortOrder);
    }

    return this.http.get<MarketResponse>(this.apiUrl, { params: httpParams });
  }
}
