import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap, withLatestFrom, delay, combineLatest, tap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions/option-vols.actions';
import * as fromServices from './../../services/option-vols.service';
import * as fromStore from '../reducers';
import * as fromSelector from '../../store/selectors';
import * as fromModels from '../../models/index';
import { SizingService } from 'src/app/features/sizing/services';

@Injectable()
export class OptionVolsEffects {

    @Effect()
    loadSupportedTickers$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.LOAD_SUPPORTED_TICKERS),
            switchMap(() => {
                return this.optionVolsService$
                    .loadSupportedTickers()
                    .pipe(
                        map((res: string[]) => new fromActions.LoadSupportedTickersComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSupportedTickersFailed(err))
                        ));
            })
        );

    @Effect()
    addSupportedTickers$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.ADD_SUPPORTED_TICKERS),
            map((action: fromActions.AddSupportedTickers) => action.payload),
            switchMap(payload => {
                return this.optionVolsService$
                    .addSupportedTickers(payload)
                    .pipe(
                        map((res: string[]) => new fromActions.AddSupportedTickersComplete(res)),
                        catchError((err: string) => of(new fromActions.AddSupportedTickersFailed(err))
                    ));
            })
        );

    @Effect()
    deleteSupportedTickers$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.DELETE_SUPPORTED_TICKERS),
            map((action: fromActions.DeleteSupportedTickers) => action.payload),
            switchMap(payload => {
                return this.optionVolsService$
                    .deleteSupportedTickers(payload)
                    .pipe(
                        map((res: string[]) => new fromActions.DeleteSupportedTickersComplete(res)),
                        catchError((err: string) => of(new fromActions.DeleteSupportedTickersFailed(err))
                    ));
            })
        );

    @Effect()
    updateSupportedTickers$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.UPDATE_SUPPORTED_TICKERS),
            map((action: fromActions.UpdateSupportedTickers) => action.payload),
            switchMap(payload => {
                return this.optionVolsService$
                    .updateSupportedTickers(payload)
                    .pipe(
                        map((res: string[]) => new fromActions.UpdateSupportedTickersComplete(res)),
                        catchError((err: string) => of(new fromActions.UpdateSupportedTickersFailed(err))
                    ));
            })
        );

    @Effect()
    loadFuturesMapping$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.LOAD_FUTURES_MAPPING),
            switchMap(() => {
                return this.optionVolsService$
                    .loadFuturesMapping()
                    .pipe(
                        map((res: any) => {
                            if (res) {
                                const result = Object.keys(res).map(key => {
                                    return {futureRoot: key, benchmarkMnemonic: res[key]};
                                });
                                return new fromActions.LoadFuturesMappingComplete(result);
                            } else {
                                return new fromActions.LoadFuturesMappingComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.LoadFuturesMappingFailed(err))
                    ));
            })
        );


    @Effect()
    addFuturesMapping: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.ADD_FUTURES_MAPPING),
            map((action: fromActions.AddFuturesMapping) => action.payload),
            switchMap(payload => {
                return this.optionVolsService$
                    .addFuturesMapping(payload)
                    .pipe(
                        map((res: string[]) => {
                            if (res) {
                                const result = Object.keys(res).map(key => {
                                    return {futureRoot: key, benchmarkMnemonic: res[key]};
                                });
                                return new fromActions.AddFuturesMappingComplete(result);
                            } else {
                                return new fromActions.AddFuturesMappingComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.AddFuturesMappingFailed(err))
                    ));
            })
        );

    @Effect()
    deleteFuturesMapping: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.DELETE_FUTURES_MAPPING),
            map((action: fromActions.DeleteFuturesMapping) => action.payload),
            switchMap(payload => {
                return this.optionVolsService$
                    .deleteFuturesMapping(payload)
                    .pipe(
                        map((res: string[]) => {
                            if (res) {
                                const result = Object.keys(res).map(key => {
                                    return {futureRoot: key, benchmarkMnemonic: res[key]};
                                });
                                return new fromActions.DeleteFuturesMappingComplete(result);
                            } else {
                                return new fromActions.DeleteFuturesMappingComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.DeleteFuturesMappingFailed(err))
                    ));
            })
        );

    @Effect()
    updateFuturesMapping: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.UPDATE_FUTURES_MAPPING),
            map((action: fromActions.UpdateFuturesMapping) => action.payload),
            switchMap(payload => {
                return this.optionVolsService$
                    .updateFuturesMapping(payload)
                    .pipe(
                        map((res: string[]) => {
                            if (res) {
                                const result = Object.keys(res).map(key => {
                                    return {futureRoot: key, benchmarkMnemonic: res[key]};
                                });
                                return new fromActions.UpdateFuturesMappingComplete(result);
                            } else {
                                return new fromActions.UpdateFuturesMappingComplete([]);
                            }
                        }),
                        catchError((err: string) => of(new fromActions.UpdateFuturesMappingFailed(err))
                    ));
            })
        );

    @Effect()
    loadOptionChain$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.LOAD_OPTION_CHAIN),
            map((action: fromActions.LoadOptionChain) => action.payload),
            switchMap((payload) => {
                return this.optionVolsService$
                    .getOptionChain(payload)
                    .pipe(
                        map(res => new fromActions.LoadOptionChainComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadOptionChainFailed(err))
                    ));
                })
        );

    @Effect()
    loadSizingCapitals$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.LOAD_SIZING_CAPITALS),
            mergeMap(() => {
                return this.sizingService$
                    .getSizingCapitals()
                    .pipe(
                        map((res: fromModels.SizingCapital[]) => new fromActions.LoadSizingCapitalsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSizingCapitalsFailed(err))
                    ));
            })
        );

    @Effect()
    runOptionVolAnalysis$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.RUN_OPTION_VOL_ANALYSIS),
            map((action: fromActions.RunOptionVolAnalysis) => action.payload),
            // delay(200000), // for testting
            mergeMap((payload) => {
                return this.optionVolsService$
                    .runOptionVolAnalysis(payload)
                    .pipe(
                        map(res => new fromActions.RunOptionVolAnalysisComplete({guid: payload.guid, result: res})),
                        catchError((err) => of(new fromActions.RunOptionVolAnalysisFailed({guid: payload.guid, message: err}))
                    ));
            })
        );

    @Effect()
    runFXOptionVolAnalysis$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.RUN_FX_OPTION_VOL_ANALYSIS),
            map((action: fromActions.RunFXOptionVolAnalysis) => action.payload),
            // delay(200000), // for testting
            mergeMap((payload) => {
                return this.optionVolsService$
                    .runFXOptionVolAnalysis(payload)
                    .pipe(
                        map(res => new fromActions.RunFXOptionVolAnalysisComplete({ guid: payload.guid, result: res })),
                        catchError((err) => of(new fromActions.RunFXOptionVolAnalysisFailed({ guid: payload.guid, message: err }))
                        ));
            })
        );

    @Effect()
    reloadRequest$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.RELOAD_REQUEST),
            map((action: fromActions.ReloadRequest) => action.payload),
            mergeMap(guid => of(guid).pipe(
                withLatestFrom(this.store.select(fromSelector.getOptionVolRequestEntitiesByGuid, guid))
            )),
            mergeMap(([guid, targetRequest]) => {

                if (targetRequest.templateType === 'FX') {
                    return [
                        new fromActions.RunFXOptionVolAnalysis(targetRequest),
                        new fromActions.GetOptionVolAnalysisLogs(targetRequest.guid)
                    ];
                } else {
                    return [
                        new fromActions.RunOptionVolAnalysis(targetRequest),
                        new fromActions.GetOptionVolAnalysisLogs(targetRequest.guid)
                    ];
                }
            })
        );

    @Effect()
    notifySupport$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.NOTIFY_SUPPORT),
            map((action: fromActions.ReloadRequest) => action.payload),
            mergeMap(guid => of(guid).pipe(
                withLatestFrom(this.store.select(fromSelector.getOptionVolRequestEntitiesByGuid, guid)),
            )),
            mergeMap(([guid, targetRequest]) => {
                return this.optionVolsService$
                    .notifySupport(targetRequest)
                    .pipe(
                        map(res => new fromActions.NotifySupportComplete(res)),
                        catchError((err) => of(new fromActions.NotifySupportFailed(err))
                    ));
            })
        );

    @Effect()
    getOptionVolAnalysisLogs$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.OptionVolsActionTypes.GET_OPTION_VOL_ANALYSIS_LOGS),
            map((action: fromActions.GetOptionVolAnalysisLogs) => action.payload),
            delay(5000),
            mergeMap(guid => of(guid).pipe(
                withLatestFrom(this.store.select(fromSelector.getOptionVolAnalysisLoadingEntityByGuid, guid))
            )),
            mergeMap(([guid, analysisLoadingStatus]) => {
                if (analysisLoadingStatus) {
                    return this.optionVolsService$
                    .getOptionVolAnalysisLogs(guid)
                    .pipe(
                        switchMap(res => {
                            if (res && res.type === 'info'){
                                return [
                                    new fromActions.GetOptionVolAnalysisLogsComplete({guid: guid, message: res}),
                                    new fromActions.GetOptionVolAnalysisLogs(guid),
                                ];
                            } else if (res && res.type === 'error') {
                                return [
                                    new fromActions.RunOptionVolAnalysisFailed({guid: guid, message: res})
                                ];
                            }
                        }),
                        catchError((err: string) => of(new fromActions.GetOptionVolAnalysisLogsFailed({guid: guid, message: err}))
                    ));
                } else {
                   return empty();
                }

            })
        );

    constructor(
        private actions$: Actions,
        private optionVolsService$: fromServices.OptionVolsService,
        private sizingService$: SizingService,
        private store: Store<fromStore.OptionVolsState>
    ) { }
}
