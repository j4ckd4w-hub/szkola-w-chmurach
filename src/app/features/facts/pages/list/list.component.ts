import { AfterViewInit, Component, DestroyRef, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { Card } from 'primeng/card';
import { Button } from 'primeng/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { authLogoutAction } from '@core/state/features/auth';
import { AuthStoreModule } from '@core/state/features/auth/store.module';
import { FactsStoreModule } from '@core/state/features/facts/store.module';
import {
  factsListAction,
  factsListClearAction,
  selectFactsListLoadingState,
  selectFactsListSuccessState
} from '@core/state/features/facts';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { BehaviorSubject, filter, withLatestFrom } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { ProgressSpinner } from 'primeng/progressspinner';

@Component({
  selector: 'app-facts-list',
  imports: [
    Card,
    Button,
    FormsModule,
    ReactiveFormsModule,
    AuthStoreModule,
    FactsStoreModule,
    AsyncPipe,
    ProgressSpinner
  ],
  standalone: true,
  templateUrl: './list.component.html',
})
export class FactsListComponent implements OnInit, AfterViewInit {
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  private readonly destroyRef = inject(DestroyRef);
  private readonly store = inject(Store);
  readonly factsList$ = this.store.select(selectFactsListSuccessState);
  readonly factsListLoading$ = this.store.select(selectFactsListLoadingState);
  private readonly tryLoadMore$$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  dataSet: Set<string> = new Set<string>();

  /*
  W API mamy ograniczoną ilość elementów i w pewnym momencie dojdziemy do sytuacji że każdy kolejny request będzie zwracał elementy które już mamy w swojej kolekcji.
  Aby temu zapobiec ustawiłem limit prób na 20, jeżeli w ciągu 20 prób nie uda się pobrać nowych elementów to przerywam próby.
   */
  private loadMoreAttempt = 0;
  private readonly maxLoadMoreAttempts = 20;

  maxAttemptsAchieved(): boolean {
    return this.loadMoreAttempt === this.maxLoadMoreAttempts;
  }

  ngAfterViewInit(): void {
    this.scrollContainer.nativeElement.addEventListener('scroll', () => this.onScroll());
  }

  onScroll(): void {
    const container = this.scrollContainer.nativeElement;
    if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
      this.tryLoadMore$$.next(true);
    }
  }

  ngOnInit(): void {
    this.tryLoadMore$$.next(true);
    this.factsList$.pipe(
      filter(facts => !!facts?.data?.length),
      takeUntilDestroyed(this.destroyRef)
    ).subscribe(facts => {
      this.store.dispatch(factsListClearAction());
      this.addElementsViaSet(facts.data)
    })

    this.tryLoadMore$$.pipe(
      withLatestFrom(this.factsListLoading$),
      filter(([tryLoadMore, loading]) => tryLoadMore && !loading),
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(_ => {
      this.tryLoadMore$$.next(false);
      this.loadMore()
    });
  }

  loadMore(): void {
    if (!this.maxAttemptsAchieved()) {
      this.store.dispatch(factsListAction({
        params: {
          count: 10
        }
      }));
    }
  }

  addElementsViaSet(randomFacts: string[]): void {
    let newSet = new Set([...this.dataSet, ...randomFacts]);
    if (this.dataSet.size === newSet.size) {
      this.loadMoreAttempt++;
      this.loadMore();
      return;
    } else {
      this.loadMoreAttempt = 0;
      this.dataSet = newSet;
    }
  }

  logout(): void {
    this.store.dispatch(authLogoutAction());
  }

  /*
  Implementacja testowa do porównania z rozwiazaniem z użyciem SET

  Testowanie lokalnie przy pobieraniu 100 z 1000 losowych elementów i SET w porównaniu do Array jest ok. 2x szybszy

  dataArray$$: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  addElementsViaArray(randomFacts: string[]): void {
  let start = performance.now()
  let data = this.dataArray$$.getValue();
  randomFacts.forEach(fact => {
    if (!data.includes(fact)) {
      data.push(fact);
    }
  });
  this.dataArray$$.next(data);
  let end = performance.now()
  console.log(`Time taken: ${(end - start).toFixed(6)} milliseconds`);
  }

  */
}
