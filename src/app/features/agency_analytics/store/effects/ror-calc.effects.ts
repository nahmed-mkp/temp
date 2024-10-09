import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromModels from '../../models/agency-analytics.models';
import * as fromServices from './../../services/agency-analytics.service';
import * as fromActions from './../actions/ror-calc.actions';

@Injectable()
export class RoRCalcEffects {

    @Effect()
    runRoRCalc$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RoRActionTypes.RUN_ROR),
            map((action: fromActions.RunRoR) => action.payload),
            switchMap((payload: { portfolioGuid: string, securities: fromModels.ISecurityInput[] }) => {
                return this.agencyAnalyticsService$
                    .runRoR(payload.portfolioGuid, payload.securities)
                    .pipe(
                        map((res: any[]) => new fromActions.RunRoRComplete(res)),
                        catchError((err: string) => of(new fromActions.RunRoRFailed(err))
                        ));
            })
        );

    @Effect()
    runRoRCalcPartial$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.RoRActionTypes.RUN_ROR_PARTIAL),
            map((action: fromActions.RunRoRPartial) => action.payload),
            switchMap((payload: { portfolioGuid: string, securities: fromModels.ISecurityInput[] }) => {
                return this.agencyAnalyticsService$
                    .runRoRPartial(payload.portfolioGuid, payload.securities)
                    .pipe(
                        map((res: any[]) => new fromActions.RunRoRPartialComplete(res)),
                        catchError((err: string) => of(new fromActions.RunRoRPartialFailed(err))
                        ));
            })
        );

    constructor(private actions$: Actions, private agencyAnalyticsService$: fromServices.AgencyAnalyticsService) { }
}