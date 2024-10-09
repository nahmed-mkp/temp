import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromModels from '../../models/agency-analytics.models';
import * as fromServices from './../../services/agency-analytics.service';
import * as fromActions from './../actions/py-calc.actions';

@Injectable()
export class PYCalcEffects {

    @Effect()
    runPYCalc$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PYCalcActionTypes.RUN_PY_CALC),
            map((action: fromActions.RunPYCalc) => action.payload),
            switchMap((payload: { portfolioGuid: string, securities: fromModels.ISecurityInput[]}) => {
                return this.agencyAnalyticsService$
                    .runPYCalc(payload.portfolioGuid, payload.securities)
                    .pipe(
                        map((res: any[]) => new fromActions.RunPYCalcComplete(res)),
                        catchError((err: string) => of(new fromActions.RunPYCalcFailed(err))
                        ));
            })
        );

    @Effect()
    runPYCalcPartial$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.PYCalcActionTypes.RUN_PY_CALC_PARTIAL),
            map((action: fromActions.RunPYCalcPartial) => action.payload),
            switchMap((payload: { portfolioGuid: string, securities: fromModels.ISecurityInput[] }) => {
                return this.agencyAnalyticsService$
                    .runPYCalcPartial(payload.portfolioGuid, payload.securities)
                    .pipe(
                        map((res: any[]) => new fromActions.RunPYCalcPartialComplete(res)),
                        catchError((err: string) => of(new fromActions.RunPYCalcPartialFailed(err))
                        ));
            })
        );

    constructor(private actions$: Actions, private agencyAnalyticsService$: fromServices.AgencyAnalyticsService) { }
}