import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { SettingsRequest, SettingsResponse, SettingsResponseDTO } from '../types/settings';
import { SETTINGS_ENDPOINT } from '../constants/settings.constants';

@Injectable({
  providedIn: 'root',
})
export class StxSettingsService {
  private readonly httpClient = inject(HttpClient);
  private readonly prefix = SETTINGS_ENDPOINT;
  private readonly url = `${environment.apiUrl}/${this.prefix}`;

  getSettings(): Observable<SettingsResponse<SettingsResponseDTO>> {
    return this.httpClient.get<SettingsResponse<SettingsResponseDTO>>(this.url, { withCredentials: true });
  }

  setSettings(body: SettingsRequest): Observable<SettingsResponse<SettingsResponseDTO>> {
    return this.httpClient.post<SettingsResponse<SettingsResponseDTO>>(this.url, body, { withCredentials: true });
  }

  removeSettings(): Observable<SettingsResponse<null>> {
    return this.httpClient.delete<SettingsResponse<null>>(this.url, { withCredentials: true });
  }
}
