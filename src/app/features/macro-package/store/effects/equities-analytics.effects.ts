import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';
import { switchMap, map, catchError, withLatestFrom, mergeMap } from 'rxjs/operators';
import * as _ from 'lodash';


import * as fromServices from './../../services/equities.service';
import * as fromModels from './../../models/equities.models';
import * as fromActions from './../actions/equities-analytics.actions';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';


@Injectable()
export class EquityAnalyticsEffects {

    @Effect()
    loadDates$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS_DATES),
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
                                new fromActions.LoadEquityAnalyticsDatesComplete(res),
                                new fromActions.LoadEquityAnalytics(res[0])
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadEquityAnalyticsDatesFailed(err)))
                    );
            })
        );

    @Effect()
    loadAnalytics$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_ANALYTICS),
            map((action: fromActions.LoadEquityAnalytics) => action.payload),
            switchMap((payload: string) => {
                return this.service$
                    .loadAnalytics(payload)
                    .pipe(
                        switchMap((res: any[]) =>  {
                            const uniqueIndex = _.uniq(_.map(res, 'Ticker'));
                            const loadIndexTimeseriesActionCollection = uniqueIndex.map(index => new fromActions.LoadEquityIndexTimeseries({index: index, asOfDate: payload}));
                            return [
                                new fromActions.LoadEquityAnalyticsComplete(res),
                                ...loadIndexTimeseriesActionCollection
                            ];
                        }),
                        catchError((err: string) => of(new fromActions.LoadEquityAnalyticsFailed(err)))
                    );
            })
        );

    @Effect()
    loadIndexTimeseries$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_INDEX_TIMESERIES),
            map((action: fromActions.LoadEquityIndexTimeseries) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getIndexTimeseries)),
            mergeMap(([payload, timeseriesEntity] ) => {

                if (timeseriesEntity && timeseriesEntity[payload.index]) {
                    return of(new fromActions.LoadEquityIndexTimeseriesComplete({
                        index: payload.index,
                        fundamentals: timeseriesEntity[payload.index]['fundamentals'],
                        vols:  timeseriesEntity[payload.index]['vols'],
                    }));
                } else {
                    return this.service$
                    .loadIndexTimeseries(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadEquityIndexTimeseriesComplete({
                            index: res.index,
                            fundamentals: this.formatData(this.dataService.csvToObjectArrayWithColumnHeaders(res['fundamentals'], 'Date')),
                            vols: this.formatData(this.dataService.csvToObjectArrayWithColumnHeaders(res['vols'], 'Date')),
                        })),
                        catchError((err: string) => of(new fromActions.LoadEquityIndexTimeseriesFailed(err)))
                    );
                }
            })
        );


    @Effect()
    loadSectorTimeseries$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.EquitiesAnalyticsActionTypes.LOAD_EQUITY_SECTOR_TIMESERIES),
            map((action: fromActions.LoadEquitySectorTimeseries) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getSectorTimeseries)),
            switchMap(([payload, timeseriesEntity]) => {

                if (timeseriesEntity && timeseriesEntity[payload.index + payload.sector]) {
                    return of(new fromActions.LoadEquitySectorTimeseriesComplete({
                        index: payload.index,
                        sector: payload.sector,
                        fundamentals: timeseriesEntity[payload.index + payload.sector],
                    }));
                } else {
                    return this.service$
                    .loadSectorTimeseries(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadEquitySectorTimeseriesComplete({
                            index: res.index,
                            sector: res.sector,
                            fundamentals:  this.formatData(this.dataService.csvToObjectArrayWithColumnHeaders(res['fundamentals'], 'Date')),
                        })),
                        catchError((err: string) => of(new fromActions.LoadEquitySectorTimeseriesFailed(err)))
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
        private service$: fromServices.MacroEquitiesService,
        private dataService: HighchartsDataService,
        private store: Store<fromStore.MacroAnalyticsState>
    ) {}
}
