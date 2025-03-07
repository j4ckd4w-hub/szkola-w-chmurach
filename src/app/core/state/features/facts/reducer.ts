import { createFeatureSelector, createReducer, createSelector, on } from '@ngrx/store';
import { FactsModel } from '@core/models';
import { HttpErrorResponse } from '@angular/common/http';
import { factsListAction, factsListFailureAction, factsListSuccessAction } from '@core/state/features/facts/actions';

export const reducerKey = 'facts';

export interface FactsState {
  list: FactsModel | null;
  loading: boolean;
  error?: HttpErrorResponse;
}

export const initialState: FactsState = {
  list: null,
  loading: false,
  error: null,
};

export const factsReducer = createReducer(
  initialState,
  on(factsListAction, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(factsListSuccessAction, (state, { payload }) => ({
    ...state,
    list: payload,
    loading: false,
  })),
  on(factsListFailureAction, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);

export const selectFactsState = createFeatureSelector<FactsState>(reducerKey);
export const selectFactsListSuccessState = createSelector(selectFactsState, (state: FactsState) => state.list);
export const selectFactsListLoadingState = createSelector(selectFactsState, (state: FactsState) => state.loading);
export const selectFactsListErrorState = createSelector(selectFactsState, (state: FactsState) => state.error);
