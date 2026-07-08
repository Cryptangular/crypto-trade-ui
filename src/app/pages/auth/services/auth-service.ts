import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, map, Observable, of, switchMap, tap, throwError } from 'rxjs';
import { AuthRequest, AuthResponse, User } from '../types/auth.types';
import { environment } from '../../../../environments/environment';
import { toObservable } from '@angular/core/rxjs-interop';
import { StxSettingsService } from '../../stx-settings-page/services/stx-settings.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly settingsService = inject(StxSettingsService);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  private readonly _currentUser = signal<User | null>(null);

  readonly currentUser = this._currentUser.asReadonly();

  readonly isAuthenticated = computed(() => !!this._currentUser());

  readonly isAuthenticated$ = toObservable(this.isAuthenticated);

  checkAuth(): Observable<AuthResponse | null> {
    return this.http.get<AuthResponse>(`${this.apiUrl}/me`, { withCredentials: true }).pipe(
      tap(user => {
        this._currentUser.set(user);
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          this._currentUser.set(null);
          return of(null);
        }

        return throwError(() => error);
      })
    );
  }

  signUp(data: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, data, {
        withCredentials: true,
      })
      .pipe(
        tap(user => {
          this._currentUser.set(user);
        }),
        catchError(error => this.handleError(error))
      );
  }

  signOut(): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(`${this.apiUrl}/logout`, {}, { withCredentials: true }).pipe(
      tap(() => this._currentUser.set(null)),
      catchError(error => this.handleError(error))
    );
  }

  login(data: AuthRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, data, {
        withCredentials: true,
      })
      .pipe(
        tap(user => {
          this._currentUser.set(user);
        }),
        switchMap(user => this.settingsService.getConnectionStatus().pipe(map(() => user))),
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorMessage = 'An unexpected error occurred';
    return throwError(() => new Error(error.error?.message || error.message || errorMessage));
  }
}
