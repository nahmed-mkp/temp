import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { switchMap, map, catchError, mergeMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';


import * as fromModels from './../../models/yieldbook.models';
import * as fromActions from './../actions/yieldbook.actions';
import * as fromServices from './../../services/yieldbook.service';

@Injectable()
export class YieldbookEffects {

    @Effect()
    loadYieldbookRequestLogsByDate$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_LOGS_BY_DATE),
            map((action: fromActions.LoadYieldbookRequestLogsByDate) => action.payload),
            switchMap((payload: string) => {
                return this.yieldbookService$
                    .loadYieldbookRequestsByDate(payload)
                    .pipe(
                        map((res: fromModels.IYieldbookRequestLog[]) => new fromActions.LoadYieldbookRequestLogsByDateComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadYieldbookRequestLogsByDateFailed(err))
                        ));
            })
        );

    @Effect()
    loadYieldbookRequestById$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_REQUEST_BY_ID),
            map((action: fromActions.LoadYieldbookRequestById) => action.payload),
            switchMap((payload: number) => {
                return this.yieldbookService$
                    .loadYieldbookRequestById(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadYieldbookRequestByIdComplete({yieldBookRequestID: payload, data: res})),
                        catchError((err: string) => of(new fromActions.LoadYieldbookRequestByIdFailed({yieldBookRequestID: payload, error: err}))
                        ));
            })
        );

    @Effect()
    loadYieldbookResponseById$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.YieldbookActionTypes.LOAD_YIELDBOOK_RESPONSE_BY_ID),
            map((action: fromActions.LoadYieldbookResponseById) => action.payload),
            switchMap((payload: number) => {
                return this.yieldbookService$
                    .loadYieldbookResponseById(payload)
                    .pipe(
                        map((res: any) => new fromActions.LoadYieldbookResponseByIdComplete({yieldBookRequestID: payload, data: res})),
                        catchError((err: string) => of(new fromActions.LoadYieldbookResponseByIdFailed({yieldBookRequestID: payload, error: err}))
                    ));
            })
        );

    // -------------------------------------------------------------------------------------------------------------------------------

    @Effect()
    runPYCalc$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.YieldbookActionTypes.RUN_PYCALC),
            map((action: fromActions.RunPYCalc) => action.payload),
            mergeMap((payload: any) => {
                const RecordId = payload['RecordId'];
                const PortfolioId = payload['PortfolioId'];
                return this.yieldbookService$
                    .processPYCalc(payload)
                    .pipe(
                        map((res: any) => {
                            const BatchId = res['BatchId'];
                            return new fromActions.CheckRequestStatus({RecordId, PortfolioId, BatchId});
                        }),
                        catchError((err: string) => of(new fromActions.RunPYCalcFailed(err))
                    ));
            })
        );

    @Effect()
    runSensitivities$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.YieldbookActionTypes.RUN_SENSITIVITIES),
            map((action: fromActions.RunSensitivities) => action.payload),
            mergeMap((payload: any) => {
                return this.yieldbookService$
                    .processSensitivities(payload)
                    .pipe(
                        map((res: any) => new fromActions.RunSensitivitiesComplete(res)),
                        catchError((err: string) => of(new fromActions.RunSensitivitiesFailed(err))
                    ));
            })
    );

    @Effect()
    runHorizonAnalysis$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.YieldbookActionTypes.RUN_HORIZON_ANALYSIS),
            map((action: fromActions.RunHorizonAnalysis) => action.payload),
            mergeMap((payload: any) => {
                return this.yieldbookService$
                    .processHorizonAnalysis(payload)
                    .pipe(
                        map((res: any) => new fromActions.RunHorizonAnalysisComplete(res)),
                        catchError((err: string) => of(new fromActions.RunHorizonAnalysisFailed(err))
                    ));
            })
    );

    @Effect()
    runModelValidation$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.YieldbookActionTypes.RUN_MODEL_VALIDATION),
            map((action: fromActions.RunModelValidation) => action.payload),
            mergeMap((payload: any) => {
                return this.yieldbookService$
                    .processModelValidation(payload)
                    .pipe(
                        map((res: any) => new fromActions.RunModelValidationComplete(res)),
                        catchError((err: string) => of(new fromActions.RunModelValidationFailed(err))
                    ));
            })
        );


    // --------------------------------------------------------------------------------
    @Effect()
    checkRequestStatus$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.YieldbookActionTypes.CHECK_REQUEST_STATUS),
            map((action: fromActions.CheckRequestStatus) => action.payload),
            mergeMap((payload: any) => {
                const RecordId = payload['RecordId'];
                const PortfolioId = payload['PortfolioId'];
                return this.yieldbookService$
                    .checkRequestStatus(payload)
                    .pipe(
                        map((res: any) => {
                            const BatchId = res['BatchId'];
                            return new fromActions.CheckRequestStatus({RecordId, PortfolioId, BatchId});
                        }),
                        catchError((err: string) => of(new fromActions.RunPYCalcFailed(err))
                    ));
            })
        );

    constructor(
        private actions$: Actions,
        private yieldbookService$: fromServices.YieldbookService
    ) { }
}
