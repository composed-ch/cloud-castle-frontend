import { Injectable } from '@angular/core';
import { Observable, map, catchError, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private readonly apiUrl = 'http://localhost:3000/api/auth/login';

  constructor(private http: HttpClient) { }

  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string }>(this.apiUrl, { username, password }).pipe(
      map((response: { token: string; }) => {
        localStorage.setItem('jwt', response.token);
        return true;
      }),
      catchError((error: any) => {
        console.error('Login failed:', error);
        return of(false);
      })
    );
  }

  logout(): void {
    localStorage.removeItem('jwt');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }
}