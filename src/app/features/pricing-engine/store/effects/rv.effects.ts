import { Injectable } from '@angular/core';
import { empty, Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

import * as fromServices from '../../services';
import * as fromActions from '../actions';
import * as fromStore from '../../store';
import * as fromModels from '../../models'
import * as fromSelectors from '../selectors';
import moment from 'moment';

@Injectable()
export class RvEffects {

    loadRvConfigData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadRVTrades, fromActions.updateRvTradesComplete, fromActions.insertIntoRvTradesComplete, fromActions.deleteSecsFromRvTradesComplete), 
        withLatestFrom(this.store.select(fromSelectors.getSelectedDate)),
        switchMap( ( [{},asOfDate]) => {
            return this.service$.loadRVConfigData(moment(asOfDate).format('MM-DD-YYYY'))
            .pipe(
                map( (res: fromModels.IRvDataRes[]) => {
                    if (res !== null) {
                      res.map( (data, idx) => {
                          data['id'] = idx;
                      })
                      return fromActions.loadRVTradesComplete(res);
                    }
                }),
                catchError( (err: string) => of(fromActions.loadRVTradesFailed(err)))
            )
        })
    ))
    
    loadRvConfigSuggestionsData$ = createEffect( () => this.actions$.pipe(
      ofType(fromActions.loadRvSecSuggestions), 
      switchMap( ({userInput}) => {
          return this.service$.loadRvConfigSuggestionsData(userInput.toUpperCase())
          .pipe(
              map( (res: any) => {
                  if (res !== null) {
                      return fromActions.loadRvSecSuggestionsComplete(res);
                  }
              }),
              catchError( (err: string) => of(fromActions.loadRvSecSuggestionsFailed(err)))
          )
      })
    ))

    loadMdidEnrichedData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadMdidEnrichedData), 
        switchMap( ({payload}) => {
            return this.service$.getMdidEnrichedData(payload)
            .pipe(
                map( (res: any) => {
                    if (res !== null) {
                        return fromActions.loadMdidEnrichedDataComplete(res);
                    }
                }),
                catchError( (err: string) => of(fromActions.loadMdidEnrichedDataFailed(err)))
            )
        })
    ))

    loadUserInputEnrichedData$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadUserInputEnrichedData), 
        switchMap( ({payload}) => {
            return this.service$.getUserInputEnrichedData(payload)
            .pipe(
                map( (res: any) => {
                    if (res !== null) {
                        return fromActions.loadUserInputEnrichedDataComplete(res);
                    }
                }),
                catchError( (err: string) => of(fromActions.loadUserInputEnrichedDataFailed(err)))
            )
        })
    ))

    updateRvTables$ = createEffect( () => this.actions$.pipe(
        ofType(fromActions.loadMdidEnrichedDataComplete), 
        switchMap( ({res}) => {
            return this.service$.updateRvTrades(res)
            .pipe(
                map( (res: any) => {
                    if (res !== null) {
                        return fromActions.updateRvTradesComplete(res);
                    }
                }),
                catchError( (err: string) => of(fromActions.updateRvTradesFailed(err)))
            )
        })
    ))
    
    insertIntoRvTables$ = createEffect( () => this.actions$.pipe(
      ofType(fromActions.loadUserInputEnrichedDataComplete), 
      switchMap( ({res}) => {
          return this.service$.insertIntoRvTrades(res)
          .pipe(
              map( (res: any) => {
                return fromActions.insertIntoRvTradesComplete(res);  
              }),
              catchError( (err: string) => of(fromActions.insertIntoRvTradesFailed(err)))
          )
      })
    ))

    deleteFromRvTables$ = createEffect( () => this.actions$.pipe(
      ofType(fromActions.deleteSecsFromRvTrades), 
      switchMap( ({payload}) => {
          return this.service$.deleteFromRvTrades(payload)
          .pipe(
              map( (res: any) => {
                return fromActions.deleteSecsFromRvTradesComplete(res);  
              }),
              catchError( (err: string) => of(fromActions.deleteSecsFromRvTradesFailed(err)))
          )
      })
    ))

    constructor(
        private actions$: Actions,
        private store: Store<fromStore.State>,
        private service$: fromServices.PricingEngineService,
        private dataService: HighchartsDataService,
    ) { }
}

