import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromServices from '../../services';
import * as fromModels from '../../models';
import * as fromActions from '../actions';
import { switchMap, catchError, map } from 'rxjs/operators';

@Injectable()
export class MarketDataSearchEffects {

    @Effect()
    loadProviders$: Observable<Action> =
        this.actions$.pipe(
            ofType(fromActions.MarketDataSearchActionTypes.LOAD_PROVIDERS),
            switchMap(() => {
                return this.marketDataSearchService$
                    .loadProviders()
                    .pipe(
                        map((res: fromModels.MarketDataProvider[]) => new fromActions.LoadProvidersComplete(res)),
                        catchError((res: string) => of(new fromActions.LoadProvidersFailed(res)))
                    );
            })
        );

    @Effect()
    searchSecurity$: Observable<Action> =
        this.actions$.pipe(
            ofType(fromActions.MarketDataSearchActionTypes.SEARCH_MARKET_DATA),
            map((action: fromActions.SearchMarketData) => action.payload),
            switchMap((payload: fromModels.MarketDataSearchCriteria) => {
                return this.marketDataSearchService$
                    .searchMarketData(payload)
                    .pipe(
                        map((res: fromModels.MarketDataSearchResult[]) => new fromActions.SearchMarketDataComplete(res)),
                        catchError((res: string) => of(new fromActions.SearchMarketDataFailed(res)))
                    );
            })
        );

    @Effect()
    searchMarketDataForTimeseriesExporter$: Observable<Action> =
        this.actions$.pipe(
                ofType(fromActions.MarketDataSearchActionTypes.SEARCH_MARKET_DATA_FOR_TIMESERIES_EXPORTER),
                map((action: fromActions.SearchMarketDataForTimeseriesExporter) => action.payload),
                switchMap((payload: fromModels.MarketDataSearchCriteriaForTimeseriesExporter) => {
                    return this.marketDataSearchService$
                        .searchMarketDataForTimeseriesExporter(payload)
                        .pipe(
                            map((res: fromModels.MarketDataForTimeseriesExporter[]) => new fromActions.SearchMarketDataForTimeseriesExporterComplete(res)),
                            catchError((res: string) => of(new fromActions.SearchMarketDataForTimeseriesExporterFailed(res)))
                        );
                })
        );

    @Effect()
    searchSecurityForTimeseriesExporter$: Observable<Action> =
        this.actions$.pipe(
            ofType(fromActions.MarketDataSearchActionTypes.SEARCH_SECURITY_FOR_TIMESERIES_EXPORTER),
            map((action: fromActions.SearchSecurityForTimeseriesExporter) => action.payload),
            switchMap((payload: fromModels.SecuritySearchCriteriaForTimeseriesExporter) => {
                return this.marketDataSearchService$
                    .searchSecurityForTimeseriesExporter(payload)
                    .pipe(
                        map((res: fromModels.SecurityForTimeseriesExporter[]) => new fromActions.SearchSecurityForTimeseriesExporterComplete(res)),
                        catchError((err: string) => of(new fromActions.SearchSecurityForTimeseriesExporterFailed(err)))
                    );
            })
        );

    @Effect()
    getMarketDataForSecurity$: Observable<Action> =
        this.actions$.pipe(
            ofType(fromActions.MarketDataSearchActionTypes.GET_MARKET_DATA_FOR_SECURITY),
            map((action: fromActions.GetMarketDataForSecurity) => action.payload),
            switchMap((payload: number) => {
                return this.marketDataSearchService$
                    .getMarketDataForSID(payload)
                    .pipe(
                        map((res: fromModels.MarketDataForTimeseriesExporter[]) => new fromActions.GetMarketDataForSecurityComplete(res)),
                        catchError((err: string) => of(new fromActions.GetMarketDataForSecurityFailed(err)))
                    );
            })
        );


    constructor(
        private actions$: Actions,
        private marketDataSearchService$: fromServices.MarketDataSearchService
    ) {}
}
