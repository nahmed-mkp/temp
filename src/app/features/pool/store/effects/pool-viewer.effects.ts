import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';


import * as fromActions from './../actions';
import * as fromModels from './../../models/pool-viewer.models';
import * as fromServices from './../../services/pool-viewer.service';

import * as fromLookupsModels from './../../models/lookups.models';
import * as fromLookupServices from './../../services/lookups.service';


@Injectable()
export class PoolViewerEffects {

    @Effect()
    loadAllLookups$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PortfolioActionTypes.LOAD_ALL_LOOKUPS),
            switchMap(() => {
                return this.lookupsService$
                    .loadAllLookups()
                    .pipe(
                        map((res: fromLookupsModels.ILookups) => new fromActions.LoadAllLookupsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadAllLookupsFailed(err))
                        ));
            })
        );

    @Effect()
    loadPortfolios$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PortfolioActionTypes.LOAD_PORTFOLIOS),
            switchMap(() => {
                return this.poolViewerService$
                    .getPortfolios()
                    .pipe(
                        map((res: fromModels.Portfolio[]) => new fromActions.LoadPortfoliosComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPortfoliosFailed(err))
                    ));
            })
        );

    // @Effect()
    // loadPoolViewerInfo$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_INFO),
    //         map((action: fromActions.LoadPoolViewerInfo) => action.payload),
    //         switchMap((payload: fromModels.Portfolio) => {
    //             return this.poolViewerService$
    //                 .getPoolViewerInfo(payload)
    //                 .pipe(
    //                     map((res: fromModels.PoolViewerInfo) => new fromActions.LoadPoolViewerInfoComplete(res)),
    //                     catchError((err: string) => of(new fromActions.LoadPoolViewerInfoFailed(err))
    //                 ));
    //         })
    //     );

    // @Effect()
    // loadPoolViewerInfoComplete$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_INFO_COMPLETE),
    //         map((action: fromActions.LoadPoolViewerInfoComplete) => action.payload),
    //         switchMap((payload: fromModels.PoolViewerInfo) => {
    //             return this.poolViewerService$
    //                 .getPoolInfoItems(payload)
    //                 .pipe(
    //                     map((res: fromModels.Security[]) => new fromActions.LoadPoolViewerItemsComplete(res)),
    //                     catchError((err: string) => of(new fromActions.LoadPoolViewerItemsFailed(err))
    //                 ));
    //         })
    //     );

    @Effect()
    loadPoolViewerItems$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS),
            map((action: fromActions.LoadPoolViewerItems) => action.payload),
            mergeMap((payload: fromModels.PoolViewerInfo) => {
                return this.poolViewerService$
                    .getPoolInfoItems(payload)
                    .pipe(
                        map((res: fromModels.Security[]) => new fromActions.LoadPoolViewerItemsComplete({portfolioId: payload.portfolioId, securities: res})),
                        catchError((err: string) => of(new fromActions.LoadPoolViewerItemsFailed(`Portfolio Id ${payload.portfolioId} analytic loading failed`))
                    ));
            })
        );

    @Effect()
    LoadPoolViewerItemsColumnsLayout$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT),
            switchMap(() => {
                return this.poolViewerService$
                    .getPoolInfoItemsGridColumnsLayout()
                    .pipe(
                        map((res: fromModels.PoolItemsGridColumnLayout[]) => new fromActions.LoadPoolViewerItemsColumnsLayoutComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPoolViewerItemsColumnsLayoutFailed(err))
                    ));
            })
        );

    @Effect()
    SavePoolViewerItemsColumnsLayout$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_COLUMNS_LAYOUT),
            map((action: fromActions.SavePoolViewerItemsColumnsLayout) => action.payload),
            switchMap((payload: fromModels.PoolItemsGridColumnLayout) => {
                return this.poolViewerService$
                    .savePoolInfoItemsGridColumnsLayout(payload)
                    .pipe(
                        map((res: fromModels.PoolItemsGridColumnLayout) => new fromActions.SavePoolViewerItemsColumnsLayoutComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPoolViewerItemsColumnsLayoutFailed(err))
                    ));
            })
        );

    @Effect()
    LoadPoolViewerItemsGroupings$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_ITEMS_GROUPINGS),
            switchMap(() => {
                return this.poolViewerService$
                    .getPoolItemsGroupings()
                    .pipe(
                        map((res: fromModels.PoolItemGridRowGrouping[]) => new fromActions.LoadPoolViewerItemsGroupingsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPoolViewerItemsGroupingsFailed(err))
                    ));
            })
        );

    @Effect()
    SavePoolViewerItemsGroupings$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PoolViewerActionTypes.SAVE_POOL_VIEWER_ITEMS_GROUPING),
            map((action: fromActions.SavePoolViewerItemsGrouping) => action.payload),
            switchMap((payload: fromModels.PoolItemGridRowGrouping) => {
                return this.poolViewerService$
                    .savePoolItemsGrouping(payload)
                    .pipe(
                        map((res: fromModels.PoolItemGridRowGrouping) => new fromActions.SavePoolViewerItemsGroupingComplete(res)),
                        catchError((err: string) => of(new fromActions.SavePoolViewerItemsGroupingFailed(err))
                    ));
            })
        );

    // @Effect()
    // createPortfolios$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.PortfolioActionTypes.CREATE_EMPTY_PORTFOLIO),
    //         map((action: fromActions.CreatePortfolio) => action.payload),
    //         switchMap((payload: fromModels.Portfolio) => {
    //             let poolItemsClone = [];
    //             if (payload.cusips) {
    //                 poolItemsClone = payload.cusips.map((cusip: string) => {
    //                     return Object.assign({}, mockPoolItem, {poolItemId: Date.now().toString(), portfolioId: payload.id});
    //                 });
    //             }
    //             return this.poolViewerService$
    //                 .createPortfolio(payload)
    //                 .pipe(
    //                     mergeMap((res: fromModels.Portfolio) => [new fromActions.CreatePortfolioComplete(res), new fromActions.LoadPoolViewerItemsComplete({portfolioId: res.portfolioId, securities: poolItemsClone})]),
    //                     catchError((err: string) => of(new fromActions.LoadPortfoliosFailed(err))
    //                 ));
    //         })
    //     );

    @Effect()
    addCusipsToPortfolio$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PortfolioActionTypes.ADD_CUSIPS_TO_PORTFOLIO),
            map((action: fromActions.AddCusipsToPortfolio) => action.payload),
            switchMap((payload: fromModels.cusipsAddOrRemove) => {
                return this.poolViewerService$
                    .addCusipsToPortfolio(payload)
                    .pipe(
                        map((res: fromModels.cusipsAddOrRemoveResponse) => new fromActions.AddCusipsToPortfolioComplete(res)),
                        catchError((err: string) => of(new fromActions.AddCusipsToPortfolioFailed(err)))
                    );
            })
        );

    @Effect()
    loadDefaultScenarios$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PortfolioActionTypes.LOAD_DEFAULT_SCENARIO),
            switchMap(() => {
                return this.poolViewerService$
                    .getDefaultScenarios()
                    .pipe(
                        map((res: fromModels.defaultScenario[]) => new fromActions.LoadDefaultScenarioComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDefaultScenarioFailed(err)))
                    );
            })
        );

    @Effect()
    loadPoolViewerConfigurations$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PoolViewerActionTypes.LOAD_POOL_VIEWER_CONFIGURAIONS),
            switchMap(() => {
                return this.poolViewerService$
                    .getConfigurations()
                    .pipe(
                        map((res: fromModels.configurations) => new fromActions.LoadPoolViewerConfigurationsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadPoolViewerConfigurationsFailed(err)))
                    );
            })
        );

    @Effect()
    loadPortfolioYieldbookResult$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PoolViewerActionTypes.LOAD_PORTFOLIO_YIELDBOOK_RESULT),
            map((action: fromActions.LoadPortfolioYieldbookResult) => action.payload),
            mergeMap(payload => {
                return this.poolViewerService$
                    .getPortfolioYieldbookResult(payload)
                    .pipe(
                        map(res => new fromActions.LoadPortfolioYieldbookResultComplete({portfolioId: payload.portfolioId, data: res})),
                        catchError((err: string) => of(new fromActions.LoadPortfolioYieldbookResultFailed(err)))
                    );
            })
        );

    @Effect()
    loadPortfolioModelValidationDetail$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_DETAIL),
            map((action: fromActions.LoadPortfolioModelValidationDetail) => action.payload),
            switchMap(payload => {
                return this.poolViewerService$
                    .getPortfolioModelValidation(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadPortfolioModelValidationDetailComplete({cusip: payload.cusip, data: res})),
                        catchError((err: string) => of(new fromActions.LoadPortfolioModelValidationDetailFailed(err)))
                    );
            })
        );

    @Effect()
    loadPortfolioModelValidationSummary$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PortfolioActionTypes.LOAD_PORTFOLIO_MODEL_VALIDATION_SUMMARY),
            map((action: fromActions.LoadPortfolioModelValidationSummary) => action.payload),
            switchMap(payload => {
                return this.poolViewerService$
                    .getPortfolioModelValidation(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadPortfolioModelValidationSummaryComplete({cusip: payload.cusip, data: res})),
                        catchError((err: string) => of(new fromActions.LoadPortfolioModelValidationSummaryFailed(err)))
                    );
            })
        );

    @Effect()
    loadBidlists$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PortfolioActionTypes.LOAD_BIDLISTS),
            map((action: fromActions.LoadBidlists) => action.payload),
            mergeMap(payload => {
                let requestType;
                if (payload.request_type === 1) {
                    requestType = 'firstPanel';
                    return this.poolViewerService$
                    .getBidlists(payload)
                    .pipe(
                        map(res => new fromActions.LoadBidlistsComplete({requestType: requestType, data: res})),
                        catchError((err: string) => of(new fromActions.LoadBidlistsFailed({requestType: requestType, error: err})))
                    );
                // } else if (payload.request_type === 2) {
                //     requestType = 'secondPanel';
                } else if (payload.request_type === 3) {
                    requestType = 'thirdPanel';
                    return this.poolViewerService$
                    .getBidlists(payload)
                    .pipe(
                        switchMap(res => {
                            const targetCusip = res.map(element => element['Cusip']);
                            return [
                                new fromActions.SetLoadIndicativesFromBidlistsOnOffSwitch(true),
                                new fromActions.LoadBidlistsComplete({requestType: requestType, data: res}),
                                new fromActions.LoadIndicativesFromBidlists({cusips: targetCusip}),
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadBidlistsFailed({requestType: requestType, error: err})))
                    );
                } else if (payload.request_type === 4) {
                    requestType = 'fourthPanel';
                    return this.poolViewerService$
                    .getBidlists(payload)
                    .pipe(
                        map(res => new fromActions.LoadBidlistsComplete({requestType: requestType, data: res})),
                        catchError((err: string) => of(new fromActions.LoadBidlistsFailed({requestType: requestType, error: err})))
                    );
                }


            })
        );


    // -------------------------------------------------------------------------------------------------

    @Effect()
    getRiskFreeRate$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PortfolioActionTypes.LOAD_RISK_FREE_RATE),
            switchMap(() => {
                return this.poolViewerService$
                    .getRiskFreeRate()
                    .pipe(
                        map((res: any) => new fromActions.LoadRiskFreeRateComplete(res.data.riskFreeRate)),
                        catchError((err: string) => of(new fromActions.LoadRiskFreeRateError(err)))
                    );
            })
        );

    @Effect()
    updateRiskFreeRate$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PortfolioActionTypes.UPDATE_RISK_FREE_RATE),
            map((action: fromActions.UpdateRiskFreeRate) => action.payload),
            switchMap((payload: number) => {
                return this.poolViewerService$
                    .updateRiskFreeRate(payload)
                    .pipe(
                        map((res: any) => new fromActions.UpdateRiskFreeRateComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateRiskFreeRateFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private poolViewerService$: fromServices.PoolViewerService,
        private lookupsService$: fromLookupServices.LookupsService
    ) {}
}
