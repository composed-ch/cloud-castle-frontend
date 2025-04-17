import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(username: string, password: string): Observable<boolean> {
    // TODO: real authentication
    return of(username === 'admin' && password === 'admin').pipe(
      delay(1000),
      tap(success => {
        if (success) {
          localStorage.setItem('jwt', 'fake-jwt-token');
        }
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