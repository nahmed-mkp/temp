import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, mergeMap, catchError, withLatestFrom } from 'rxjs/operators';

import * as fromActions from '../actions';
import * as fromServices from '../../services';
import * as fromModels from '../../models';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers'

@Injectable()
export class TBAReportsTimeseriesEffects {

    @Effect()
    loadTimeseries: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LOAD_TIMESERIES),
            mergeMap(() => {
                return this.tbaTimeseriesService
                    .loadTimeseries()
                    .pipe(
                        map((res: fromModels.OASTimeseries[]) => new fromActions.LoadTimeseriesComplete(res)),
                        catchError(err => of(new fromActions.LoadTimeseriesFailed(err)))
                    );
            })
        );

    @Effect()
    loadCoupons: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LOAD_COUPONS),
            mergeMap(() => {
                return this.tbaTimeseriesService
                    .loadCoupons()
                    .pipe(
                        map((res: fromModels.OASCoupon[]) => new fromActions.LoadCouponsComplete(res)),
                        catchError(err => of(new fromActions.LoadCouponsFailed(err)))
                    );
            })
        );

    @Effect()
    loadMetricTypes: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LOAD_METRIC_TYPES),
            mergeMap(() => {
                return this.tbaTimeseriesService
                    .loadMetricTypes()
                    .pipe(
                        map((res: fromModels.MetricType[]) => new fromActions.LoadMetricTypesComplete(res)),
                        catchError(err => of(new fromActions.LoadMetricTypesFailded(err)))
                    );
            })
        );


    @Effect()
    refreshCache: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.REFRESH_CACHE),
            map((action: fromActions.RefreshCache) => action.payload),
            mergeMap((plotType: string) => {
                return this.tbaTimeseriesService
                    .refreshCache(plotType)
                    .pipe(
                        map((res: any) => new fromActions.RefreshCacheComplete({plotType: plotType, message: res.message})),
                        catchError(err => of(new fromActions.RefreshCacheFailed({plotType: plotType, message: err})))
                    );
            })
        );

    @Effect()
    loadChartData: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LOAD_CHART_DATA),
            map((action: fromActions.LoadChartData) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getActiveMode)),
            mergeMap(([request, mode]) => {
                let url;
                if (request.requestType === 'OAS') {
                    if(request.coupon.bond.includes('CC')) return [];
                    else url = request.coupon.oasUrl;
                } else if (request.requestType === 'TSYOAS') {
                    if(request.coupon.bond.includes('CC')) return [];
                    else url = request.coupon.tsyOasUrl;
                } else {
                    if (request.coupon.isSupportedByTBATracker) {
                        if(mode==='dialedTypeMode') {
                            if(request.coupon.bond.includes('CC') && request.coupon.bond.includes('Dialed') === false) return [];
                            else url = `http://prizm-map.mkpcap.com/api/v1/tbacharts/dialed/${request.requestType}/${request.coupon.bond}/${request.coupon.coupon}`
                        } else if(mode=== 'v99TypeMode') {
                            if(request.coupon.bond.includes('CC')===false) url = `http://prizm-map.mkpcap.com/api/v1/tbacharts/v99/${request.requestType}/${request.coupon.bond}/${request.coupon.coupon}`;
                            else return []
                        } else if(mode=== 'trackerTypeMode') {
                            if(request.coupon.bond.includes('Dialed')) return [];
                            else url = `http://prizm-map.mkpcap.com/api/v1/tbacharts/trackers/${request.requestType}/${request.coupon.bond}/${request.coupon.coupon}`
                        }
                    } else { return []; }   // don't fire ajax request if coupon not support tracker mode
                }
                return this.tbaTimeseriesService
                    .getChartData(url)
                    .pipe(
                        map((res: fromModels.PlotDataResult) => new fromActions.LoadChartDataComplete(res)),
                        catchError(err => of(new fromActions.LoadChartDataFailed(err)))
                    );
            })
        );

    @Effect()
    loadChartComparisonData: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LOAD_COMPARISON_CHART_DATA),
            map((action: fromActions.LoadComparisonChartData) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getActiveMode)),
            mergeMap(([request, mode]) => {
                let url: string;
                if (request.requestType === 'OAS') {
                    url = request.coupon.oasCompareUrl;
                } else if (request.requestType === 'TSYOAS') {
                    url = request.coupon.tsyOasCompareUrl;
                } else {
                    if (request.coupon.isSupportedByTBATracker) {
                        if(mode==='dialedTypeMode') url = `http://prizm-map.mkpcap.com/api/v1/tbacharts/dialed/${request.requestType}/compare`;
                        else if(mode=== 'v99TypeMode') url = `http://prizm-map.mkpcap.com/api/v1/tbacharts/v99/${request.requestType}/compare`;
                        else url = `http://prizm-map.mkpcap.com/api/v1/tbacharts/trackers/${request.requestType}/compare`;
                    } else { return []; }   // don't fire ajax request if coupon not support tracker mode
                }
                return this.tbaTimeseriesService
                    .getChartComparisonData(url, request.coupon, request.coupon.couponToCompare)
                    .pipe(
                        map((res: fromModels.PlotDataResult) => new fromActions.LoadComparisonChartDataComplete(res)),
                        catchError(err => of(new fromActions.LoadComparisonChartDataFailed(err)))
                    );
            })
        );

    @Effect()
    loadTrackerTimestamp: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.LOAD_TRACKER_TIMESTAMP),
            mergeMap(() => {
                return this.tbaTimeseriesService
                    .getTrackerTimeStamp()
                    .pipe(
                        map((res: fromModels.TrackerTimestamp) => new fromActions.LoadTrackerTimestampComplete(res.timestamp)),
                        catchError(err => of(new fromActions.LoadTrackerTimestampFailed(err)))
                    );
            })
        );

    @Effect()
    DownloadTrackers: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DOWNLOAD_TRACKERS),
            switchMap(() => {
                this.tbaTimeseriesService.downloadTracker();
                return empty();
            })
        );

    constructor(private actions$: Actions,
                private tbaTimeseriesService: fromServices.TimeseriesService,
                private store: Store<fromStore.State>) {}
}
