import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import * as fromActions from './../actions/timeseries-search.actions';
import * as fromServices from './../../services/timeseries-search.service';
import * as fromModels from './../../models/timeseries.models';

// import all requried services or any dependencies

@Injectable()
export class TimeseriesSearchEffects {

    constructor(private action$: Actions,
        private timeseriesSearchService$: fromServices.TimeseriesSearchService) { }

    @Effect()
    loadSources$ = this.action$.pipe(
        ofType(fromActions.TimeseriesSearchActionTypes.LOAD_SOURCES),
        switchMap(() => {
            return this.timeseriesSearchService$
                .loadSources()
                .pipe(
                    map((data: string[]) => new fromActions.LoadSourcesComplete(data)),
                    catchError(error => of(new fromActions.LoadSourcesFailed(error)))
                );
        })
    );

    @Effect()
    searchTimeseries$ = this.action$.pipe(
        ofType(fromActions.TimeseriesSearchActionTypes.SEARCH_TIMESERIES),
        map((action: fromActions.SearchTimeseries) => action.payload),
        switchMap((payload: fromModels.ITimeseriesSearch) => {
            return this.timeseriesSearchService$
                .searchTimeseries(payload)
                .pipe(
                    map((data: fromModels.ITimeseries[]) => new fromActions.SearchTimeseriesComplete(data)),
                    catchError(error => of(new fromActions.SearchTimeseriesFailed(error)))
                );
        })
    );

    @Effect()
    previewTimeseries$ = this.action$.pipe(
        ofType(fromActions.TimeseriesSearchActionTypes.PREVIEW_TIMESERIES),
        map((action: fromActions.PreviewTimeseries) => action.payload),
        switchMap((payload: fromModels.ITimeseries) => {
            return this.timeseriesSearchService$
                .previewTimeseries(payload)
                .pipe(
                    map((data: fromModels.ITimeseriesPreview) => new fromActions.PreviewTimeseriesComplete(data)),
                    catchError(error => of(new fromActions.PreviewTimeseriesFailed(error)))
                );
        })
    );
}
