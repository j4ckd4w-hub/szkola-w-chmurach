import { AuthEffects } from '@core/state/features/auth/effects';
import { AuthService } from '@root/services/auth.service';
import { authReducer, reducerKey } from '@core/state/features/auth/reducer';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';

@NgModule({
  imports: [
    StoreModule.forFeature(reducerKey, authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  providers: [AuthService]
})
export class AuthStoreModule {
}
