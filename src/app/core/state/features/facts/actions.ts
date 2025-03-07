import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { FactsModel, FactsQuery } from '@core/models';

export const factsListAction = createAction('[Facts] List', props<{ params: FactsQuery }>());
export const factsListSuccessAction = createAction('[Facts] List Success', props<{ payload: FactsModel }>());
export const factsListFailureAction = createAction('[Facts] List Failure', props<{ error: HttpErrorResponse }>());
export const factsListClearAction = createAction('[Facts] List clear');
