import { FactsEffects } from '@core/state/features/facts/effects';
import { EffectsModule } from '@ngrx/effects';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { factsReducer, reducerKey } from '@core/state/features/facts/reducer';
import { FactsService } from '@root/services';


@NgModule({
  imports: [
    StoreModule.forFeature(reducerKey, factsReducer),
    EffectsModule.forFeature([FactsEffects])
  ],
  providers: [FactsService]
})
export class FactsStoreModule {
}
