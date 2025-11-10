import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

/**
 * Interceptor function to handle 401 Unauthorized responses globally.
 * It clears the token and redirects the user to the login page.
 */
export const unauthorizedInterceptor: HttpInterceptorFn = (req, next) => {
    const router = inject(Router);
    return next(req).pipe(
        catchError((error: HttpErrorResponse) => {
            if (error.status === 401) {
                console.error('401 Unauthorized: Token expired or invalid. Redirecting to login.');
                localStorage.removeItem('jwt');
                router.navigate(['/login']);
                return throwError(() => new Error('Session expired. Redirected to login.'));
            }
            return throwError(() => error);
        })
    );
};