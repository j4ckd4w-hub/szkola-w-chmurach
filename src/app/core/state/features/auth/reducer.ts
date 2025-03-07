import { LoginModel } from '@core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { authLoginAction, authLoginFailureAction, authLoginSuccessAction } from '@core/state/features/auth/actions';
import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';

export const reducerKey = 'auth';

export interface AuthState {
  login: LoginModel | null;
  loading: boolean;
  error?: HttpErrorResponse;
}

export const initialState: AuthState = {
  login: null,
  loading: false,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(authLoginAction, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(authLoginSuccessAction, (state, { payload }) => ({
    ...state,
    login: payload,
    loading: false,
  })),
  on(authLoginFailureAction, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectAuthState = createFeatureSelector<AuthState>(reducerKey);
export const selectAuthLoginSuccessState = createSelector(selectAuthState, (state: AuthState) => state.login);
export const selectAuthLoginLoadingState = createSelector(selectAuthState, (state: AuthState) => state.loading);
export const selectAuthLoginErrorState = createSelector(selectAuthState, (state: AuthState) => state.error);
