import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, withLatestFrom } from 'rxjs/operators';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';


import * as fromServices from '../../services/inflation.service';
import * as fromActions from '../actions/inflation.actions';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';

@Injectable()
export class InflationAnalyticsEffects {

    @Effect()
    loadAnalyticsDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS_DATES),
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
                                new fromActions.LoadInflationAnalyticsDatesComplete(res),
                                new fromActions.LoadInflationAnalytics(res[0]),
                                new fromActions.LoadInflationTimeseries(res[0]),
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadInflationAnalyticsDatesFailed(err)))
                    );
            })
        );

    @Effect()
    loadInflationAnalytics$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_ANALYTICS),
            map((action: fromActions.LoadInflationAnalytics) => action.payload),
            switchMap((payload: string) => {
                return this.service$
                    .loadAnalytics(payload)
                    .pipe(
                        map(res => new fromActions.LoadInflationAnalyticsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadInflationAnalyticsFailed(err)))
                    );
            })
        );

    @Effect()
    loadTimeseries$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.InflationAnalyticsActionTypes.LOAD_INFLATION_TIMESERIES),
            map((action: fromActions.LoadInflationTimeseries) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getInflationAnalyticsTimeseries)),
            switchMap(([payload, timeseriesEntity]) => {

                if (timeseriesEntity && timeseriesEntity[payload]) {
                    return of(new fromActions.LoadInflationTimeseriesComplete({
                        [payload]: timeseriesEntity[payload]
                    }));
                } else {
                    return this.service$
                    .loadTimeseries(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadInflationTimeseriesComplete({
                            [payload]: this.formatData(this.dataService$.csvToObjectArrayWithColumnHeaders(res.data, 'Date'))
                        })),
                        catchError((err: string) => of(new fromActions.LoadInflationTimeseriesFailed(err)))
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
        private service$: fromServices.MacroInflationService,
        private dataService$: HighchartsDataService,
        private store: Store<fromStore.MacroAnalyticsState>
    ) { }
}

