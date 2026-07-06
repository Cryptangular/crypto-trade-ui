import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { catchError, Observable, of, tap } from 'rxjs';
import { SettingsRequest, SettingsResponse, SettingsResponseDTO } from '../types/settings';
import { SETTINGS_ENDPOINT, SETTINGS_MESSAGES } from '../constants/settings.constants';

@Injectable({
  providedIn: 'root',
})
export class StxSettingsService {
  private readonly httpClient = inject(HttpClient);
  private readonly prefix = SETTINGS_ENDPOINT;
  private readonly url = `${environment.apiUrl}/${this.prefix}`;

  private readonly _isConnected = signal<boolean>(false);
  readonly isConnected = this._isConnected.asReadonly();

  getSettings(): Observable<SettingsResponse<SettingsResponseDTO>> {
    return this.httpClient.get<SettingsResponse<SettingsResponseDTO>>(this.url, { withCredentials: true });
  }

  setSettings(body: SettingsRequest): Observable<SettingsResponse<SettingsResponseDTO>> {
    return this.httpClient
      .post<SettingsResponse<SettingsResponseDTO>>(this.url, body, { withCredentials: true })
      .pipe(tap(() => this._isConnected.set(true)));
  }

  removeSettings(): Observable<SettingsResponse<null>> {
    return this.httpClient.delete<SettingsResponse<null>>(this.url, { withCredentials: true }).pipe(
      tap(() => {
        this._isConnected.set(false);
      })
    );
  }

  getConnectionStatus(): Observable<SettingsResponse<null> | null> {
    return this.httpClient.get<SettingsResponse<null>>(`${this.url}/connection-status`, { withCredentials: true }).pipe(
      tap(({ code }) => {
        const isConnected = code === SETTINGS_MESSAGES.CONNECTION_ON;

        this._isConnected.set(isConnected);
      }),
      catchError(() => {
        this._isConnected.set(false);
        return of(null);
      })
    );
  }
}
