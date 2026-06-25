import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, Observable, throwError } from 'rxjs';
import { ToastService } from '../toast/toast-service';

@Injectable({
  providedIn: 'root',
})
export class StxApiService {
  private http = inject(HttpClient);
  private readonly baseUrl = environment.binanceApiUrl;
  private toaster = inject(ToastService);

  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, { params }).pipe(
      catchError(error => {
        this.toaster.danger('Connection Error', 'Failed to load data from the server. Please try again later.');

        return throwError(() => error);
      })
    );
  }
}
