import { createAction, props } from '@ngrx/store';
import { LoginDto } from '@core/models/auth/login.dto';
import { LoginModel } from '@core/models/auth/login.model';
import { HttpErrorResponse } from '@angular/common/http';

export const authLoginAction = createAction('[Auth] Login', props<{ payload: LoginDto }>());
export const authLoginSuccessAction = createAction('[Auth] Login Success', props<{ payload: LoginModel }>());
export const authLoginFailureAction = createAction('[Auth] Login Failure', props<{ error: HttpErrorResponse }>());
export const authLoginClearAction = createAction('[Auth] Login clear');

export const authLogoutAction = createAction('[Auth] Logout');
export const authLogoutSuccessAction = createAction('[Auth] Logout Success');
