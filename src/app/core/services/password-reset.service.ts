import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable, map, catchError, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PasswordResetService {
  private http = inject(HttpClient);
  private readonly base = `${environment.backendUrl}`;

  requestReset(email: string): Observable<boolean> {
    const url = `${this.base}/password/reset`;
    return this.http.post<void>(url, { email }).pipe(
      map(() => true),
      catchError(() => of(true))
    );
  }

  confirmReset(email: string, token: string, password: string): Observable<boolean> {
    return this.http.post<void>(`${this.base}/password/new`, { email, token, password }).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}