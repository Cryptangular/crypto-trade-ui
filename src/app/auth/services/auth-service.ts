import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { User } from '../models/auth.models';
import { AuthResponse, SignUpRequest } from '../types/auth.types';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:3000/api/auth';

  private readonly _currentUser = signal<User | null>(null);

  readonly currentUser = this._currentUser.asReadonly();
  readonly isAuthenticated = computed(() => !!this._currentUser());

  private readonly authStateSubject = new BehaviorSubject<boolean>(false);
  readonly authState$ = this.authStateSubject.asObservable();

  signUp(data: SignUpRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, data, {
        withCredentials: true,
      })
      .pipe(
        tap(user => {
          this._currentUser.set(user);
          this.authStateSubject.next(true);
          console.log('Account created successfully!');
        }),
        catchError(error => this.handleError(error))
      );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    const errorStatus = error.status;

    console.log(errorStatus);

    return throwError(() => error);
  }
}
