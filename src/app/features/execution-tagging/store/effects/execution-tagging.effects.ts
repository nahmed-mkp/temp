import { Injectable } from '@angular/core';
import { from, Observable, } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';

import { switchMap, map, catchError, withLatestFrom} from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromSelectors from '../selectors';
import moment from 'moment';
import { HighchartsDataService } from 'src/app/shared/custom/utilities/highcharts-data.service';

@Injectable()
export class ExecutionTaggingEffects {

  loadPortfolioManagers$ = createEffect( () => this.actions$.pipe(
    ofType(fromActions.loadPortfolioManagers), 
    switchMap( ( ) => {
      return this.executionTaggingService.loadPortfolioManagers()
      .pipe(
          map( res => fromActions.loadPortfolioManagersComplete(res)),
          catchError( (err: string) => of(fromActions.loadPortfolioManagersError(err)))
      )})
    )
  );

  loadExecutions$ = createEffect( () => this.actions$.pipe(
    ofType(
      fromActions.loadExecutionsTaggingData, 
      fromActions.changeStartDate, 
      fromActions.changeEndDate,
      fromActions.changeCurrentPortfolioManager,
      fromActions.updateTagComplete
    ),
    withLatestFrom(this.store.select(fromSelectors.getCurrentPortfolioManager), this.store.select(fromSelectors.getStartDate), this.store.select(fromSelectors.getEndDate)),
    switchMap( ( [{}, portfolioManager, startDate, endDate]) => {
      return this.executionTaggingService.loadExecutions({
        startDate: startDate,
        endDate: endDate,
        portfolioManager: portfolioManager['Name'] === '(All)' ? null : portfolioManager['NTName'] 
      })
      .pipe(
        map( res => fromActions.loadExecutionsTaggingDataComplete(res)),
          catchError( (err: string) => of(fromActions.loadExecutionsTaggingDataError(err)))
      )})
    )
  );

  loadReasons$ = createEffect( () => this.actions$.pipe(
    ofType(fromActions.loadReasons, fromActions.updateReasonComplete),
    switchMap( () => {
      return this.executionTaggingService.loadReasons()
      .pipe(
        map( res => fromActions.loadReasonsComplete(res)),
          catchError( (err: string) => of(fromActions.loadReasonsError(err)))
      )})
    )
  );

  updateReason$ = createEffect( () => this.actions$.pipe(
    ofType(fromActions.updateReason), 
    switchMap( ({payload}) => {
      return this.executionTaggingService.updateReason(payload)
      .pipe(
        map( res => fromActions.updateReasonComplete(res)),
          catchError( (err: string) => of(fromActions.updateReasonError(err)))
      )})
    )
  );

  updateTag$ = createEffect( () => this.actions$.pipe(
    ofType(fromActions.updateTag), 
    switchMap( ({payload}) => {
      return this.executionTaggingService.updateTag(payload)
      .pipe(
        map( res => fromActions.updateTagComplete(res)),
          catchError( (err: string) => of(fromActions.updateTagError(err)))
      )})
    )
  );

  constructor(
      private actions$: Actions,
      private executionTaggingService: fromServices.ExecutionTaggingService,
      private store: Store<any>,
      private dataService: HighchartsDataService
  ) {}
}
