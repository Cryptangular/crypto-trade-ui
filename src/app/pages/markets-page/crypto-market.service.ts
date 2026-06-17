import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenMarketData, TokensResponse } from './types';

@Injectable({
  providedIn: 'root',
})
export class CryptoMarketService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/tokens';

  private readonly tokensMap = signal<Map<string, TokenMarketData>>(new Map());
  readonly allTokens = computed(() => Array.from(this.tokensMap().values()));

  loadInitialMarketData(): void {
    this.http.get<TokensResponse>(this.apiUrl).subscribe({
      next: res => {
        const currentMap = new Map<string, TokenMarketData>();
        res.data.forEach(token => currentMap.set(token.symbol, token));
        this.tokensMap.set(currentMap);
      },
      error: err => console.error('Failed to load REST market data', err),
    });
  }
}
