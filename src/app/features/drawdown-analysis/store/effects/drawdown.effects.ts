import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { map, catchError, mergeMap, withLatestFrom } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromActions from './../actions';
import * as fromServices from './../../services/drawdown.service';
import * as fromModels from './../../models/drawdown.models';
import * as fromSelector from '../../store/selectors';
import * as fromStore from '../reducers';

@Injectable()
export class DrawdownEffects {

    @Effect()
    LoadDrawdownAnalysisSecurity$: Observable<Action> = this.action$
        .pipe(
            ofType(fromActions.DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS_SECURITY),
            mergeMap(() => {
                return this.drawdownService$
                    .getDrawdownSecurityList()
                    .pipe(
                        map((res: fromModels.DrawDownSecurity[]) => new fromActions.LoadDrawdownAnalysisSecurityComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDrawdownAnalysisSecurityFailed(err)))
                    );
            })
        );

    @Effect()
    LoadDrawdownAnalysisTables$: Observable<Action> = this.action$
        .pipe(
            ofType(fromActions.DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS),
            map((action: fromActions.LoadDrawdownAnalysis) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getAgencyAnalyticsDrawdownTableResponsesIds)),
            mergeMap(([request, existedRequestIds]) => {
                if (existedRequestIds.indexOf(request.id) === -1) {
                    return this.drawdownService$
                    .getDrawdownAnalysis(request)
                    .pipe(
                        map((res: {id: string; payload: fromModels.DrawDownAnalysisResponse[]}) => new fromActions.LoadDrawdownAnalysisTablesComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDrawdownAnalysisTablesFailed(err)))
                    );
                } else { return []; }
            })
        );

    @Effect()
    LoadDrawdownAnalysisTimeseries$: Observable<Action> = this.action$
        .pipe(
            ofType(fromActions.DrawdownActionTypes.LOAD_DRAWDOWN_ANALYSIS),
            map((action: fromActions.LoadDrawdownAnalysis) => action.payload),
            withLatestFrom(this.store.select(fromSelector.getAgencyAnalyticsDrawdownTimeseriesResponsesIds)),
            mergeMap(([request, existedRequestIds]) => {
                if (existedRequestIds.indexOf(request.id) === -1) {
                    return this.drawdownService$
                        .getDrawdownTimeseries(request)
                        .pipe(
                            map((res: {id: string; payload: fromModels.DrawDownTimeSeriesResponse[]}) => new fromActions.LoadDrawdownAnalysisTimeSeriesComplete(res)),
                            catchError((err: string) => of(new fromActions.LoadDrawdownAnalysisTimeSeriesFailed(err)))
                        );
                } else { return []; }
            })
        );

    constructor(
        private action$: Actions,
        private drawdownService$: fromServices.DrawdownService,
        private store: Store<fromStore.state>
    ) {}
}
