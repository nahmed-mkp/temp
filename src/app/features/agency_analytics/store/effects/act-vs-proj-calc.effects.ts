import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromModels from '../../models/agency-analytics.models';
import * as fromServices from './../../services/agency-analytics.service';
import * as fromActions from './../actions/act-vs-proj-calc.actions';

@Injectable()
export class ActVsProjCalcEffects {

    @Effect()
    runRoRCalc$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ActVsProjActionTypes.RUN_ACT_VS_PROJ),
            map((action: fromActions.RunActVsProj) => action.payload),
            switchMap((payload: { portfolioGuid: string, securities: fromModels.ISecurityInput[] }) => {
                return this.agencyAnalyticsService$
                    .runActVsProj(payload.portfolioGuid, payload.securities)
                    .pipe(
                        map((res: any[]) => new fromActions.RunActVsProjComplete(res)),
                        catchError((err: string) => of(new fromActions.RunActVsProjFailed(err))
                        ));
            })
        );

    @Effect()
    runRoRCalcPartial$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.ActVsProjActionTypes.RUN_ACT_VS_PROJ_PARTIAL),
            map((action: fromActions.RunActVsProjPartial) => action.payload),
            switchMap((payload: { portfolioGuid: string, securities: fromModels.ISecurityInput[] }) => {
                return this.agencyAnalyticsService$
                    .runActVsProjPartial(payload.portfolioGuid, payload.securities)
                    .pipe(
                        map((res: any[]) => new fromActions.RunActVsProjPartialComplete(res)),
                        catchError((err: string) => of(new fromActions.RunActVsProjPartialFailed(err))
                        ));
            })
        );

    constructor(private actions$: Actions, private agencyAnalyticsService$: fromServices.AgencyAnalyticsService) { }
}