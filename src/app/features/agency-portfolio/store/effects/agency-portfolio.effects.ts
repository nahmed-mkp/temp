import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services/agency-portfolio.service';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';

@Injectable()
export class AgencyPortfolioEffects {

    // @Effect()
    // loadPositions$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.AgencyPortfolioActionTypes.LOAD_POSITIONS),
    //         map((action: fromActions.LoadPositions) => action.payload),
    //         mergeMap((payload) => {
    //             return this.agencyPortfolioService$
    //                 .getPositions(payload)
    //                 .pipe(
    //                     map(res => new fromActions.LoadPositionsComplete(res)),
    //                     catchError((err: string) => of(new fromActions.LoadPositionsFailed(err))
    //                 ));
    //         })
    //     );

    // @Effect()
    // loadSecurities$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.AgencyPortfolioActionTypes.LOAD_SECURITIES),
    //         map((action: fromActions.LoadSecurities) => action.payload),
    //         mergeMap((payload) => {
    //             return this.agencyPortfolioService$
    //                 .getSecurities(payload)
    //                 .pipe(
    //                     map(res => new fromActions.LoadSecuritiesComplete(res)),
    //                     catchError((err: string) => of(new fromActions.LoadSecuritiesFailed(err))
    //                 ));
    //         })
    //     );

    // @Effect()
    // loadBenchmarks$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.AgencyPortfolioActionTypes.LOAD_BENCHMARKS),
    //         map((action: fromActions.LoadBenchmarks) => action.payload),
    //         mergeMap((payload) => {
    //             return this.agencyPortfolioService$
    //                 .getBenchmarks(payload)
    //                 .pipe(
    //                     map(res => new fromActions.LoadBenchmarksComplete(res)),
    //                     catchError((err: string) => of(new fromActions.LoadBenchmarksFailed(err))
    //                 ));
    //         })
    //     );

    @Effect()
    loadData$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyPortfolioActionTypes.LOAD_DATA),
            map((action: fromActions.LoadData) => action.payload),
            withLatestFrom(
                this.store.select(fromSelector.getPositions),
                this.store.select(fromSelector.getSecurities),
                this.store.select(fromSelector.getBenchmarks)
            ),
            switchMap(([payload, positionsEntity, securitiesEntity, benchmarksEntity]) => {

                if (payload.pricingMode === 'live'
                    || (payload.displayMode === 'position' && positionsEntity[payload.asOfDate] === undefined)
                    || (payload.displayMode === 'security' && securitiesEntity[payload.asOfDate] === undefined)
                    || (payload.displayMode === 'benchmark' && benchmarksEntity[payload.asOfDate] === undefined)
                    || (payload.displayMode === 'rolls' && benchmarksEntity[payload.asOfDate] === undefined)
                ) {
                    return this.agencyPortfolioService$
                    .getData(payload)
                    .pipe(
                        map(res => {
                            if (payload.displayMode === 'position') {
                                return new fromActions.LoadPositionsComplete({date: payload.asOfDate, data: res});
                            } else if (payload.displayMode === 'security') {
                                return new fromActions.LoadSecuritiesComplete({date: payload.asOfDate, data: res});
                            } else if (payload.displayMode === 'rolls') {
                                return new fromActions.LoadRollsComplete({date: payload.asOfDate, data: res});
                            } else {
                                return new fromActions.LoadBenchmarksComplete({date: payload.asOfDate, data: res});
                            }
                        }),
                        catchError((err: string) => {
                            const errorAction = [];
                            if (payload.displayMode === 'position') {
                                errorAction.push(new fromActions.LoadPositionsFailed(err));
                            } else if (payload.displayMode === 'security') {
                                errorAction.push(new fromActions.LoadSecuritiesFailed(err));
                            } else {
                                errorAction.push(new fromActions.LoadBenchmarksFailed(err));
                            }
                            return errorAction;
                        })
                    );
                } else {
                    // Return Cache from store
                    if (payload.displayMode === 'position') {
                        return of(new fromActions.LoadPositionsComplete({date: payload.asOfDate, data: positionsEntity[payload.asOfDate]}));
                    } else if (payload.displayMode === 'security') {
                        return of(new fromActions.LoadSecuritiesComplete({date: payload.asOfDate, data: securitiesEntity[payload.asOfDate]}));
                    } else if (payload.displayMode === 'rolls') {
                        return of(new fromActions.LoadRollsComplete({date: payload.asOfDate, data: securitiesEntity[payload.asOfDate]}));
                    } else {
                        return of(new fromActions.LoadBenchmarksComplete({date: payload.asOfDate, data: benchmarksEntity[payload.asOfDate]}));
                    }
                }
            })
        );

    @Effect()
    loadLayout$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyPortfolioActionTypes.LOAD_LAYOUT),
            switchMap(() => {
                return this.agencyPortfolioService$
                    .loadLayout()
                    .pipe(
                        map(res => new fromActions.LoadlayoutComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadlayoutFailed(err)))
                    );
            })
        );

    @Effect()
    saveLayout$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AgencyPortfolioActionTypes.SAVE_LAYOUT),
            map((action: fromActions.SaveLayout) => action.payload),
            switchMap((payload) => {
                return this.agencyPortfolioService$
                    .saveLayout(payload)
                    .pipe(
                        map(() => new fromActions.SaveLayoutComplete(payload)),
                        catchError((err: string) => of(new fromActions.SaveLayoutFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private agencyPortfolioService$: fromServices.AgencyPortfolioService,
        private store: Store<fromStore.state>
    ) { }
}
