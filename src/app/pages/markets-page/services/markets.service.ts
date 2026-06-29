import { inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { MarketResponse, MarketToken } from '../../../shared/types/market.types';
import { environment } from '../../../../environments/environment';
import { Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class MarketsService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/tokens`;

  private readonly wsUrl = `${environment.apiUrl}/market`;

  private socket!: Socket;

  constructor() {
    // this.initWebSocket();
  }

  readonly tokens = signal<MarketToken[]>([]);

  readonly total = signal<number>(0);

  loadMarketData(page: number, limit: number, sortBy?: string, sortOrder?: string): void {
    let params = new HttpParams().set('page', page.toString()).set('limit', limit.toString());

    if (sortBy && sortOrder) {
      params = params.set('sortBy', sortBy).set('sortOrder', sortOrder);
    }

    this.http.get<MarketResponse>(this.apiUrl, { params }).subscribe({
      next: res => {
        this.tokens.set(res.data);
        this.total.set(res.total);
      },
      error: err => console.error('Failed to load REST market data', err),
    });
  }
  /*
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
  }*/
}
