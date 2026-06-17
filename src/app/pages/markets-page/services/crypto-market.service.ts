import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarketResponse, MarketToken } from '../../../shared/types/market.types';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoMarketService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tokens`;

  private readonly tokensMap = signal<Map<string, MarketToken>>(new Map());
  readonly allTokens = computed(() => Array.from(this.tokensMap().values()));

  loadInitialMarketData(): void {
    this.http.get<MarketResponse>(this.apiUrl).subscribe({
      next: res => {
        const currentMap = new Map<string, MarketToken>();
        res.data.forEach(token => currentMap.set(token.symbol, token));
        this.tokensMap.set(currentMap);
      },
      error: err => console.error('Failed to load REST market data', err),
    });
  }
}
