import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as fromActions from './../actions/timeseries-exporter.actions';
import * as fromServices from './../../services/timeseries-exporter.service';
import * as fromModels from './../../models/timeseries-exporter.models';
import { HighchartsDataService } from 'src/app/factories';
import { Store } from '@ngrx/store';
import * as fromStore from '../reducers';
import * as fromSelector from '../selectors';

// import all requried services or any dependencies

@Injectable()
export class TimeseriesExporterEffects {

    constructor(private action$: Actions,
        private store: Store<fromStore.TimeseriesExporterState>,
        private timeseriesExporterServcice$: fromServices.TimeseriesExporterService,
        private highchartsDataService: HighchartsDataService) { }

    @Effect()
    loadMonitors$ = this.action$.pipe(
        ofType(fromActions.TimeseriesExporterActionTypes.LOAD_MONITORS),
        switchMap(() => {
            return this.timeseriesExporterServcice$
                .getMonitors()
                .pipe(
                    map((data: fromModels.IMonitor[]) => new fromActions.LoadMonitorsComplete(data)),
                    catchError(error => of(new fromActions.LoadMonitorsFailed(error)))
            );
        })
    );

    @Effect()
    saveMonitors$ = this.action$.pipe(
        ofType(fromActions.TimeseriesExporterActionTypes.SAVE_MONITOR),
        map((action: fromActions.SaveMonitor) => action.payload),
        switchMap(payload => {

            const formatPayload: any = {
                name: payload.name,
                newList: payload.newList,
                add: payload.add.map(element => Object.assign({}, element, {name: payload.name})),
                update: payload.update.map(element => Object.assign({}, element, {name: payload.name})),
                delete: payload.delete.map(element => Object.assign({}, element, {name: payload.name})),
            };

            if (formatPayload.add.length === 0 && formatPayload.update.length === 0 && formatPayload.delete.length === 0) {
                return [];
            } else {
                return this.timeseriesExporterServcice$
                .saveMonitor(formatPayload)
                .pipe(
                    map((res: fromModels.ISaveMonitorResponse) => {
                        if (res.status) {
                            return new fromActions.SaveMonitorComplete(res);
                        } else {
                            return new fromActions.SaveMonitorFailed(res.error);
                        }
                    }),
                    catchError(error => of(new fromActions.SaveMonitorFailed(error)))
                );
            }
        })
    );

    @Effect()
    deleteMonitorList$ = this.action$.pipe(
        ofType(fromActions.TimeseriesExporterActionTypes.DELETE_MONITOR_LIST),
        map((action: fromActions.DeleteMonitorList) => action.payload),
        switchMap(payload => {
            return this.timeseriesExporterServcice$
                .deleteMonitorList(payload)
                .pipe(
                    map(res => {
                        if (res.status) {
                            return new fromActions.DeleteMonitorListComplete(payload);
                        } else {
                            return new fromActions.DeleteMonitorListFailed(res.error);
                        }
                    }),
                    catchError(error => of(new fromActions.DeleteMonitorListFailed(error)))
            );
        })
    );

    @Effect()
    loadTimeseries$ = this.action$.pipe(
        ofType(fromActions.TimeseriesExporterActionTypes.LOAD_TIME_SERIES),
        map((action: fromActions.LoadTimeseries) => action.payload),
        switchMap(payload => {
            return this.timeseriesExporterServcice$
                .loadTimeseries(payload)
                .pipe(
                    map((res: any) => {
                        let data = this.highchartsDataService.csvToObjectArray(res['data'], 'Date');
                        data = data.sort((valueA, valueB) => {
                            return valueA['Date'] - valueB['Date'];
                        });
                        return new fromActions.LoadTimeseriesComplete(data);
                    }),
                    catchError(error => of(new fromActions.LoadTimeseriesFailed(error)))
                );
        })
    );

    @Effect()
    loadTimeseriesWithMdidList$ = this.action$.pipe(
        ofType(fromActions.TimeseriesExporterActionTypes.LOAD_TIME_SERIES_WITH_MDID_LIST),
        map((action: fromActions.LoadTimeseriesWithMdidList) => action.payload),
        withLatestFrom(
            this.store.select(fromSelector.getParams)
        ),
        switchMap(([payload, dateRange]) => {

            const requestPayload: fromModels.ITimeseriesWithMdidListRequest = {
                startDate: dateRange.startDate,
                endDate: dateRange.endDate,
                mdidList: payload.mdidList,
                fullList: payload.fullList,
            }
            return this.timeseriesExporterServcice$
                .loadTimeseriesWithMdidList(requestPayload)
                .pipe(
                    map((res: any) => {
                        let data = this.highchartsDataService.csvToObjectArray(res['data'], 'Date');
                        data = data.sort((valueA, valueB) => {
                            return (new Date(valueA['Date'])).getTime() - (new Date(valueB['Date'])).getTime();
                        });
                        return new fromActions.LoadTimeseriesComplete(data);
                    }),
                    catchError(error => of(new fromActions.LoadTimeseriesFailed(error)))
                );
        })
    );
}
