import { Injectable } from '@angular/core';
import { NEVER, Subject, timer } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { catchError, retry, tap } from 'rxjs/operators';

export type WebSocketMessage = {
  e: string;
  E: number;
  s: string;
  // eslint-disable-next-line
  [key: string]: any;
};

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  private socket$: WebSocketSubject<WebSocketMessage> | null = null;
  private messagesSubject$ = new Subject<WebSocketMessage>();
  private reconnectionDelay = 3000;
  private maxReconnectionAttempts = 5;
  private reconnectionAttempts = 0;

  messages$ = this.messagesSubject$.asObservable();
  connectionStatus$ = new Subject<boolean>();

  connect(url: string): void {
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = this.createWebSocket(url);

      this.socket$
        .pipe(
          tap(() => {
            this.reconnectionAttempts = 0;
            this.connectionStatus$.next(true);
          }),
          retry({
            delay: error => {
              console.error('WebSocket error:', error);
              this.connectionStatus$.next(false);

              this.reconnectionAttempts++;
              if (this.reconnectionAttempts >= this.maxReconnectionAttempts) {
                console.error('Max reconnection attempts reached');
                throw error;
              }

              console.log(`Reconnecting in ${this.reconnectionDelay}ms...`);
              return timer(this.reconnectionDelay);
            },
          }),
          catchError(error => {
            console.error('Unrecoverable WebSocket error:', error);
            return NEVER;
          })
        )
        .subscribe({
          next: message => {
            this.messagesSubject$.next(message);
          },
          error: error => console.error('WebSocket subscription error:', error),
        });
    }
  }

  private createWebSocket(url: string): WebSocketSubject<WebSocketMessage> {
    return webSocket({
      url: url,
      openObserver: {
        next: () => {
          console.log('WebSocket connection opened');
          this.connectionStatus$.next(true);
        },
      },
      closeObserver: {
        next: () => {
          console.log('WebSocket connection closed');
          this.connectionStatus$.next(false);
        },
      },
    });
  }

  private sendCommand(method: 'SUBSCRIBE' | 'UNSUBSCRIBE', streams: string[]): void {
    if (this.socket$ && !this.socket$.closed) {
      const command = {
        method: method,
        params: streams,
        id: Date.now(),
      };
      // eslint-disable-next-line
      this.socket$.next(command as any);
    } else {
      console.warn('WebSocket не подключен. Невозможно отправить команду:', method);
    }
  }

  subscribeToStreams(streams: string[]): void {
    this.sendCommand('SUBSCRIBE', streams);
  }

  unsubscribeFromStreams(streams: string[]): void {
    this.sendCommand('UNSUBSCRIBE', streams);
  }

  disconnect(): void {
    if (this.socket$) {
      this.socket$.complete();
      this.connectionStatus$.next(false);
      this.socket$ = null;
    }
  }
}
