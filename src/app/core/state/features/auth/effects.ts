import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { AuthService } from '@root/services/auth.service';
import {
  authLoginAction,
  authLoginFailureAction,
  authLoginSuccessAction,
  authLogoutAction,
  authLogoutSuccessAction
} from '@core/state/features/auth/actions';
import { catchError, map, mergeMap, of } from 'rxjs';
import { LoginModel } from '@core/models';
import { HttpResponse } from '@angular/common/http';
import { AuthUtils } from '@core/utils';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  private actions$ = inject(Actions);
  private authService = inject(AuthService);
  private authUtils = inject(AuthUtils);
  private router = inject(Router);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authLoginAction),
      map((action) => action.payload),
      mergeMap((payload) =>
        this.authService.login(payload).pipe(
          map((response: HttpResponse<LoginModel>) => {
            this.authUtils.accessToken = response.body!.token;
            this.router.navigate(['/facts']);
            return authLoginSuccessAction({ payload: response.body! });
          }),
          catchError(error => of(authLoginFailureAction({ error })))
        )
      )
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authLogoutAction),
      map(_ => {
        this.authUtils.logout();
        this.router.navigate(['/auth']);
        return authLogoutSuccessAction()
      })
    )
  );
}
