import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { inject } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { catchError, map } from 'rxjs';

export const authGuard: CanActivateFn = (): Observable<boolean> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  let username = authService.getUsername();
  let token = authService.getToken();

  console.log('auth.guard -> username: ' + username);
  console.log('auth.guard -> token: ' + token);

  if (!username || !token) {
    router.navigateByUrl('/login');
    return of(false);
  }

  return authService.isValidToken(username, token).pipe(
    map((isValid) => {
      if (isValid) return true;
      else {
        router.navigateByUrl('/login');
        return false;
      }
    }),
    catchError(() => {
      router.navigateByUrl('/login');
      return of(false);
    })
  );
};
