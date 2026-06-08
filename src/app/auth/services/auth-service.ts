import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthRequest, AuthResponse, User } from '../types/auth.types';
import { environment } from '../../../environments/environment';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  private readonly _currentUser = signal<User | null>(null);

  readonly currentUser = this._currentUser.asReadonly();

  readonly isAuthenticated = computed(() => !!this._currentUser());

  readonly isAuthenticated$ = toObservable(this.isAuthenticated);

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
    return this.http.post<{ message: string }>(`${this.apiUrl}/signout`, {}, { withCredentials: true }).pipe(
      tap(() => this._currentUser.set(null)),
      catchError(error => this.handleError(error))
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred';

    if (error.status === 0) {
      errorMessage = 'Network error: Please check your internet connection.';
    } else {
      const errorMap: Record<number, string> = {
        409: 'An account with this email address already exists.',
        429: 'Too many requests. Please try again later.',
        500: 'Internal server error. Something went wrong on our end.',
      };
      errorMessage = errorMap[error.status] || error.error?.message || error.message || errorMessage;
    }
    return throwError(() => new Error(errorMessage));
  }
}
