import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MarketResponse, MarketToken } from '../../../shared/types/market.types';
import { environment } from '../../../../environments/environment';
import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class CryptoMarketService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tokens`;

  private readonly wsUrl = `${environment.apiUrl}/market`;

  private socket!: Socket;

  constructor() {
    // this.initWebSocket();
    this.loadInitialMarketData();
  }

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

  private initWebSocket(): void {
    this.socket = io(this.wsUrl, {
      transports: ['websocket'],
      autoConnect: true,
    });

    this.socket.on('connect', () => {
      console.log('Connected to NestJS Market WebSocket Gateway!');
    });

    this.socket.on('tickerUpdates', (updates: { s: string; c: string; P: string; v: string }[]) => {
      this.tokensMap.update(map => {
        const newMap = new Map(map);

        updates.forEach(update => {
          const existingToken = newMap.get(update.s);

          if (existingToken) {
            newMap.set(update.s, {
              ...existingToken,
              price: parseFloat(update.c).toString(),
              change24h: parseFloat(update.P).toFixed(2),
              volume24h: Math.round(parseFloat(update.v)).toString(),
            });
          }
        });
        return newMap;
      });
    });

    this.socket.on('disconnect', reason => {
      console.warn('Disconnected from Market WebSocket:', reason);
    });
  }
}
