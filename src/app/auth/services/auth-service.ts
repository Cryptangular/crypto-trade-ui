import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthResponse, SignUpRequest, User } from '../types/auth.types';
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

  signUp(data: SignUpRequest): Observable<AuthResponse> {
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

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unexpected error occurred';

    if (error.status === 0) {
      errorMessage = 'Network error: Please check your internet connection.';
    } else {
      switch (error.status) {
        case 429:
          errorMessage = 'Too many requests. Please try again later.';
          break;
        case 500:
          errorMessage = 'Internal server error. Something went wrong on our end.';
          break;
        case 409:
          errorMessage = 'An account with this email address already exists.';
          break;
        default:
          errorMessage = error.error?.message || error.message || errorMessage;
      }
    }
    return throwError(() => new Error(errorMessage));
  }
}
