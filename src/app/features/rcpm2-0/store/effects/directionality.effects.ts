import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action, Store } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';

import * as fromServices from '../../services/directionality.service';
import * as fromActions from '../actions/directionality.actions';
import * as fromModels from './../../models/directionality.models';
import { HighchartsDataService } from 'src/app/shared/custom/utilities';

@Injectable()
export class DirectionalityEffects {

    @Effect()
    LoadInputs$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DirectionalityActionTypes.LOAD_DIRECTIONALITY_INPUTS),
            switchMap(() => {
                return this.directionalityService.loadInputs()
                    .pipe(
                        map((res) => new fromActions.LoadDirectionalityInputsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadDirectionalityInputsFailed(err)))
                    );
            })
        );

    @Effect()
    LoadDirectionality$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DirectionalityActionTypes.LOAD_DIRECTIONALITY),
            map((action: fromActions.LoadDirectionality) => {
                return { payload: action.payload, layoutName: action.layoutName };
            }),
            switchMap((val: {payload: fromModels.DirectionalityRequest, layoutName: string}) => {
                return this.directionalityService.loadDirectionality(val.payload)
                    .pipe(
                        map((res) => new fromActions.LoadDirectionalityComplete(res, val.layoutName)),
                        catchError((err: string) => of(new fromActions.LoadDirectionalityFailed(err, val.layoutName)))
                    );
            })
        );

    @Effect()
    LoadScatterPlot$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DirectionalityActionTypes.LOAD_SCATTER_PLOT),
            map((action: fromActions.LoadScatterPlot) => {
                return { payload: action.payload, layoutName: action.layoutName, lookback: action.lookback, lookbackIndex: action.lookbackIndex };
            }),
            mergeMap((val: { payload: fromModels.ScatterPlotRequest, layoutName: string, lookback: string, lookbackIndex: string }) => {
                return this.directionalityService.loadScatterPlot(val.payload)
                    .pipe(
                        map((res) => {
                            const parseData = res.scatter ? this.dataService.csvToObjectArrayWithColumnHeaders(res.scatter, '') : [];
                            res.scatter = parseData;
                            return new fromActions.LoadScatterPlotComplete(res, val.layoutName, val.lookback, val.lookbackIndex);
                        }),
                        catchError((err: string) => of(new fromActions.LoadScatterPlotFailed(err, val.layoutName, val.lookback, val.lookbackIndex)))
                    );
            })
        );


    @Effect()
    LoadRegressionFactors$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DirectionalityActionTypes.LOAD_REGRESSION_FACTORS),
            switchMap(() => {
                return this.directionalityService.loadRegressionFactors()
                    .pipe(
                        map((res) => new fromActions.LoadRegressionFactorsComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadRegressionFactorsFailed(err)))
                    );
            })
        );

    @Effect()
    RunRegression$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.DirectionalityActionTypes.RUN_REGRESSION),
            map((action: fromActions.RunRegression) => action),
            switchMap(({payload, layoutName}) => {
                return this.directionalityService.runRegression(payload)
                    .pipe(
                        map((res) => new fromActions.RunRegressionComplete(res, layoutName)),
                        catchError((err: string) => of(new fromActions.RunRegressionFailed(err, layoutName)))
                    );
            })
        );

    constructor(
        private actions$: Actions,
        private directionalityService: fromServices.DirectionalityService,
        private dataService: HighchartsDataService,
    ) {}
}
