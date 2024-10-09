import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';


import * as fromServices from './../../services/credit.service';
import * as fromModels from './../../models/credit.models';
import * as fromActions from './../actions/credit-analytics.actions';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';

@Injectable()
export class CreditAnalyticsEffects {

    @Effect()
    loadIndices$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_INDICES),
            switchMap(() => {
                return this.service$
                    .loadCreditIndices()
                    .pipe(
                        map((res: fromModels.ICreditIndex[]) => new fromActions.LoadCreditIndicesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadCreditIndicesFailed(err)))
                    );
            })
        );

    @Effect()
    loadAnalyticsDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS_DATES),
            switchMap(() => {
                return this.service$
                    .loadDates()
                    .pipe(
                        switchMap((res: string[]) => {
                            res.sort((date1, date2) => {
                                const date1Object = new Date(date1);
                                const date2Object = new Date(date2);
                                return date2Object.getTime() - date1Object.getTime();
                            });

                            return [
                                new fromActions.LoadCreditAnalyticsDatesComplete(res),
                                new fromActions.LoadCreditAnalytics(res[0]),
                                new fromActions.LoadCreditTimeseries(res[0]),
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadCreditAnalyticsDatesFailed(err)))
                    );
            })
        );

    @Effect()
    loadIndexConstituents$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CreditAnalyticsActionTypes.LOAD_INDEX_CONSTITUENTS),
            map((action: fromActions.LoadIndexConstituents) => action.payload),
            switchMap((payload: string) => {
                return this.service$
                    .loadIndexConstituents(payload)
                    .pipe(
                        map((res: fromModels.ICreditIndexConstituent[]) => new fromActions.LoadIndexConstituentsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadIndexConstituentsFailed(err)))
                    );
            })
        );

    @Effect()
    loadSectorWeights$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CreditAnalyticsActionTypes.LOAD_SECTOR_WEIGHTS),
            map((action: fromActions.LoadSectorWeights) => action.payload),
            switchMap((payload: string) => {
                return this.service$
                    .loadSectorWeights(payload)
                    .pipe(
                        map((res: fromModels.ICreditSectorWeight[]) => new fromActions.LoadSectorWeightsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadSectorWeightsFailed(err)))
                    );
            })
        );

    @Effect()
    loadCreditAnalytics$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_ANALYTICS),
            map((action: fromActions.LoadCreditAnalytics) => action.payload),
            switchMap((payload: string) => {
                return this.service$
                    .loadAnalytics(payload)
                    .pipe(
                        map(res => new fromActions.LoadCreditAnalyticsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadCreditAnalyticsFailed(err)))
                    );
            })
        );

    @Effect()
    loadTimeseries$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CreditAnalyticsActionTypes.LOAD_CREDIT_TIMESERIES),
            map((action: fromActions.LoadCreditTimeseries) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getCreditAnalyticsTimeseries)),
            switchMap(([payload, timeseriesEntity]) => {

                if (timeseriesEntity && timeseriesEntity[payload]) {
                    return of(new fromActions.LoadCreditTimeseriesComplete({
                        [payload]: timeseriesEntity[payload]
                    }));
                } else {
                    return this.service$
                    .loadTimeseries(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadCreditTimeseriesComplete({
                            [payload]: this.formatData(this.dataService$.csvToObjectArrayWithColumnHeaders(res.data, 'Date'))
                        })),
                        catchError((err: string) => of(new fromActions.LoadCreditTimeseriesFailed(err)))
                    );
                }
            })
        );

    // Pre-format Plot data for performance

    formatData(data: any) {
        const plotData: any = {};
        data.forEach(element => {
            element['Date'] = (new Date(element['Date'])).getTime();
        });
        const columnKeys = Object.keys(data[0]).filter(key => key !== 'Date');
        columnKeys.forEach(key => plotData[key] = []);
        data.forEach(item => {
            columnKeys.forEach(key => {
                plotData[key].push([item['Date'], item[key] === '' ? undefined : item[key]]);
            });
        });
        return plotData;
    }

    constructor(
        private actions$: Actions,
        private service$: fromServices.MacroCreditService,
        private dataService$: HighchartsDataService,
        private store: Store<fromStore.MacroAnalyticsState>
    ) { }
}

