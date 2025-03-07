import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthUtils } from '@core/utils';

export const appGuard: CanActivateFn = () => {
  const authUtils = inject(AuthUtils)
  const router = inject(Router)
  if (authUtils.isTokenValid()) {
    router.navigate([''])
    return false;
  }
  return true;
}
