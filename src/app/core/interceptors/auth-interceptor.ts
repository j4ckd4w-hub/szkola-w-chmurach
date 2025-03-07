import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { AuthUtils } from '@core/utils';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authUtils = inject(AuthUtils);
  const router = inject(Router);

  // Add auth token if available
  if (authUtils.isTokenValid()) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authUtils.accessToken}`,
      }
    });
  }

  // Process the request and handle any errors
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // Handle 401 Unauthorized errors
      if (error.status === 401) {
        console.error('Authentication error:', error);
        authUtils.removeToken();
        router.navigate(['/auth']);
      }

      // Handle 403 Forbidden errors
      else if (error.status === 403) {
        router.navigate(['/forbidden']);
      }

      // Handle network errors
      else if (error.status === 0) {
        console.error('Network error - please check your connection');
      }

      // Re-throw the error for further handling
      return throwError(() => error);
    })
  );
};
