import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly url = `${environment.backendUrl}/login`;

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(this.url, { username, password }).pipe(
      map((response: { token: string; }) => {
        localStorage.setItem('username', username);
        localStorage.setItem('jwt', response.token);
        return true;
      }),
      catchError((error: any) => {
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('username');
    localStorage.removeItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  get username(): string | null {
    return localStorage.getItem('username');
  }
}