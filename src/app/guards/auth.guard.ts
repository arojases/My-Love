import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { combineLatest, filter, map, take } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return combineLatest([authService.authReady$, authService.user$]).pipe(
    filter(([authReady]) => authReady),
    take(1),
    map(([, user]) => user ? true : router.createUrlTree(['/']))
  );
};
