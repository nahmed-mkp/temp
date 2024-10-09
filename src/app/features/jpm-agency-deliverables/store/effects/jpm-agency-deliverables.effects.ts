import { Injectable } from '@angular/core';
import { Observable, of, empty, from } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { Location } from '@angular/common';
import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromStore from '..';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';
import * as fromModels from '../../models';

@Injectable()
export class JpmAgencyDeliverableEffects {

    loadPortfolioDates$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadPortfolioDates),
        switchMap( () => {
            return this.jpmAgencyDeliverableService$
            .loadPortfolioDates()
            .pipe(
                map((res: string[]) => fromActions.loadPortfolioDatesComplete(res)),
                catchError((err: string) => of(fromActions.loadPortfolioDatesFailed(err)))    
            )
        })
    ))

    loadLatestPortfolioDate$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadLatestPortfolioDate),
        switchMap( () => {
            return this.jpmAgencyDeliverableService$
            .loadLatestPortfolioDate()
            .pipe(
                map((res: string) => fromActions.loadLatestPortfolioDateComplete(res)),
                catchError((err: string) => of(fromActions.loadLatestPortfolioDateFailed(err)))    
            )
        })
    ))

    loadDeliverableConfigData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadDeliverableConfigData),
        switchMap( () => {
            return this.jpmAgencyDeliverableService$
            .loadDeliverableConfigData()
            .pipe(
                map((res: fromModels.IDeliverableData[]) => fromActions.loadDeliverableConfigDataComplete(res)),
                catchError((err: string) => of(fromActions.loadDeliverableConfigDataFailed(err)))    
            )
        })
    ))

    updateDeliverable$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.updateDeliverableConfigData),
        switchMap( (action) => {
            return this.jpmAgencyDeliverableService$
            .updateDeliverable(action.payload)
            .pipe(
                map((res: any) => fromActions.updateDeliverableConfigDataComplete(res)),
                catchError((err: string) => of(fromActions.updateDeliverableConfigDataFailed(err)))    
            )
        })
    ))

    loadDeliverableDataOnInit$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadLatestPortfolioDateComplete, fromActions.changeLatestPortfolioDate),
        withLatestFrom(this.store.select(fromStore.getLatestPortfolioDate)),
        switchMap( ([action, portfolioDate]) => {
            return this.jpmAgencyDeliverableService$
            .loadDeliverablesData(portfolioDate)
            .pipe(
                map((res: fromModels.IAgencyData[]) => fromActions.loadDeliverableDataComplete(res)),
                catchError((err: string) => of(fromActions.loadDeliverableDataFailed(err)))    
            )
        })
    ))

    loadCashDataByDateOnInit$ = createEffect( () => this.actions$.pipe(
      ofType(fromActions.loadLatestPortfolioDateComplete, fromActions.changeLatestPortfolioDate),
      withLatestFrom(this.store.select(fromStore.getLatestPortfolioDate)),
      switchMap( ([action, portfolioDate]) => {
          return this.jpmAgencyDeliverableService$
          .loadCashData(portfolioDate)
          .pipe(
              map((res: fromModels.IAgencyData[]) => fromActions.loadCashDataComplete(res)),
              catchError((err: string) => of(fromActions.loadCashDataFailed(err)))    
          )
      })
  ))

    // loadDeliverableData$ = createEffect( () => this.actions$.pipe(
    //   ofType(fromActions.loadDeliverableData),
    //   switchMap( (action) => {
    //       return this.jpmAgencyDeliverableService$
    //       .loadDeliverablesData(action.portfolioDate)
    //       .pipe(
    //           map((res: fromModels.IAgencyData[]) => fromActions.loadDeliverableDataComplete(res)),
    //           catchError((err: string) => of(fromActions.loadDeliverableDataFailed(err)))    
    //       )
    //   })
    // ))

    // loadCashData$ = createEffect( () => this.actions$.pipe(
    //   ofType(fromActions.loadCashData),
    //   switchMap( (action) => {
    //       return this.jpmAgencyDeliverableService$
    //       .loadCashData(action.portfolioDate)
    //       .pipe(
    //           map((res: fromModels.IAgencyData[]) => fromActions.loadCashDataComplete(res)),
    //           catchError((err: string) => of(fromActions.loadCashDataFailed(err)))    
    //       )
    //   })
    // ))


    constructor(
        private actions$: Actions,
        private store: Store<fromStore.AgencyDeliverablesState>,
        private jpmAgencyDeliverableService$: fromServices.JpmAgencyDeliverableService,
    ) { }
    
}

