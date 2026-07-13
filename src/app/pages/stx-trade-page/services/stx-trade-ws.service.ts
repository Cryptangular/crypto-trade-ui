import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { WebSocketMessage } from '../models/stx-trade-model';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService implements OnDestroy {
  private socket: Socket | null = null;
  private tradeStreamSubject$ = new Subject<WebSocketMessage>();

  tradeStream$ = this.tradeStreamSubject$.asObservable();
  connectionStatus$ = new Subject<boolean>();

  private activeStreams = new Set<string>();

  connect(url: string): void {
    if (this.socket && this.socket.connected) return;

    this.socket = io(url, {
      transports: ['websocket'],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 3000,
    });

    this.socket.on('connect', () => {
      console.log('Connected to Trade WebSocket Gateway');
      this.connectionStatus$.next(true);

      this.activeStreams.forEach(stream => {
        this.socket?.emit('subscribeToStream', stream);
      });
    });

    this.socket.on('tradeStreamUpdate', (data: WebSocketMessage) => {
      this.tradeStreamSubject$.next(data);
    });

    this.socket.on('disconnect', () => this.connectionStatus$.next(false));
  }

  subscribeToStream(streamName: string): void {
    const stream = streamName.toLowerCase();
    this.activeStreams.add(stream);

    if (this.socket && this.socket.connected) {
      this.socket.emit('subscribeToStream', stream);

      console.log(streamName);
    }
  }

  unsubscribeFromStream(streamName: string): void {
    const stream = streamName.toLowerCase();
    this.activeStreams.delete(stream);
    if (this.socket && this.socket.connected) {
      this.socket.emit('unsubscribeFromStream', stream);
      console.log(`Requested unsubscribe from stream: ${stream}`);
    }
  }

  disconnect(): void {
    if (this.socket) {
      this.socket.disconnect();
      this.connectionStatus$.next(false);
      this.socket = null;
      this.activeStreams.clear();
    }
  }

  ngOnDestroy(): void {
    this.disconnect();
  }
}
