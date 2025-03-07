import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { AuthUtils } from '@core/utils';

export const authGuard: CanActivateFn = () => {
  const authUtils = inject(AuthUtils)
  const router = inject(Router)
  if (authUtils.isTokenNotValid()) {
    router.navigate(['auth'])
    return false;
  }
  return true;
}
