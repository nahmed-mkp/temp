import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';
import uuidv1 from 'uuid/v1';

import * as fromModels from '../../models/indicatives.models';
import * as fromActions from '../actions';
import * as fromServices from '../../services/indicatives.service';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';


@Injectable()
export class IndicativesEffects {

    @Effect()
    loadIndicativesFromUserInput$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.IndicativesActionTypes.LOAD_INDICATIVES_FROM_USER_INPUT),
            map((action: fromActions.LoadIndicativesFromUserInput) => action.payload),
            switchMap((payload: fromModels.IIndicativeRequest) => {
                return this.indicativesService$
                    .loadIndicatives(payload)
                    .pipe(
                        map((res: any[]) => {
                            res.forEach(element => element['RecordId'] = uuidv1());
                            return new fromActions.LoadIndicativesFromUserInputComplete({portfolioId: payload.portfolioId || payload.portfolioGuid, securities: res});
                        }),
                        catchError((err: string) => of(new fromActions.LoadIndicativesFromUserInputFailed(err))
                    ));
            })
        );

    @Effect()
    loadIndicativesFromBidlist$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.IndicativesActionTypes.LOAD_INDICATIVES_FROM_BIDLIST),
            map((action: fromActions.LoadIndicativesFromBidlists) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getBidlistIndicativeDataLoadingOnOffSwitch)),
            mergeMap(([payload, onOffSwitchStatus]) => {
                //console.log('onOffSwitchStatus', onOffSwitchStatus);
                if (onOffSwitchStatus === false) {
                    return empty();
                }

                const requestCusips: any = {};
                if (payload.cusips.length > 300) {
                    requestCusips.cusips = payload.cusips.splice(0, 300);
                    return this.indicativesService$
                    .loadIndicatives(requestCusips)
                    .pipe(
                        switchMap((res: any[]) => {
                            res.forEach(element => element['RecordId'] = uuidv1());
                            return [
                                new fromActions.LoadIndicativesFromBidlistsComplete(res),
                                new fromActions.LoadIndicativesFromBidlists(payload),
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadIndicativesFromBidlistsFailed(err))
                    ));
                } else {
                    return this.indicativesService$
                    .loadIndicatives(payload)
                    .pipe(
                        map((res: any[]) => {
                            res.forEach(element => element['RecordId'] = uuidv1());
                            return new fromActions.LoadIndicativesFromBidlistsComplete(res);
                        }),
                        catchError((err: string) => of(new fromActions.LoadIndicativesFromBidlistsFailed(err))
                    ));
                }
            })
        );

    @Effect()
    CreateTempPortfolioWithExplodeData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PortfolioActionTypes.CREATE_TEMP_PORTFOLIO_WITH_EXPLODE_DATA),
            map((action: fromActions.CreateTempPortfolioWithExplodeData) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getAgencyAnalyticsPoolViewerActivePortfolioId)),
            switchMap(([payload, activePortfolioIds]) => {
                const newlyCreatedPortfolioGuid = activePortfolioIds[activePortfolioIds.length - 1];
                return this.indicativesService$
                    .loadIndicatives({
                        portfolioGuid: newlyCreatedPortfolioGuid,
                        cusips: payload.data,
                        explodeMega: true,
                        useMapFields: true,
                    })
                    .pipe(
                        map((res: any[]) => {
                            res.forEach(element => element['RecordId'] = uuidv1());
                            return new fromActions.LoadIndicativesFromUserInputComplete({portfolioId: newlyCreatedPortfolioGuid, securities: res});
                        }),
                        catchError((err: string) => of(new fromActions.LoadIndicativesFromUserInputFailed(err)))
                    );
            })
        );
    

    constructor(
        private actions$: Actions,
        private indicativesService$: fromServices.IndicativesService,
        private store: Store<fromStore.State>
    ) { }
}
