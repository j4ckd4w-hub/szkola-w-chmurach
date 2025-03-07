import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of } from 'rxjs';
import { FactsModel } from '@core/models';
import { HttpResponse } from '@angular/common/http';
import { factsListAction, factsListFailureAction, factsListSuccessAction } from '@core/state/features/facts/actions';
import { FactsService } from '@root/services';

@Injectable()
export class FactsEffects {
  private actions$ = inject(Actions);
  private factsService = inject(FactsService);

  list$ = createEffect(() =>
    this.actions$.pipe(
      ofType(factsListAction),
      map((action) => action.params),
      mergeMap((params) =>
        this.factsService.list(params).pipe(
          map((response: HttpResponse<FactsModel>) => {
            return factsListSuccessAction({ payload: response.body! });
          }),
          catchError(error => of(factsListFailureAction({ error })))
        )
      )
    )
  );
}
