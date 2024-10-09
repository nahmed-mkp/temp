import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromServices from '../../services/commissions.service';
import * as fromActions from '../actions/commissions.actions';
import * as fromModels from '../../models/commissions.models';

@Injectable()
export class CommissionsEffects {

    @Effect()
    getCommissions$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.CommissionsActionTypes.LOAD_COMMISSIONS_SCHEDULE),
            switchMap(() => {
                return this.commissionsService$
                    .getCommissions()
                    .pipe(
                        map((res: fromModels.ICommission[]) => new fromActions.LoadCommissionsScheduleComplete(res)),
                        catchError(err => of(new fromActions.LoadCommissionsScheduleFailed(err)))
                    );
            }));

    // @Effect()
    // updateCommissions$: Observable<Action> = this.actions$
    //     .pipe(
    //         ofType(fromActions.CommissionsActionTypes.UPDATE_COMMISSIONS_SCHEDULE),
    //         // map((actio n: fromActions.UpdateCommissionsSchedule) => action.payload),
    //         switchMap(() => {
    //             return this.commissionsService$
    //                 .updateCommissions()
    //                 .pipe(
    //                     map((res: fromModels.ICommission[]) => new fromActions.UpdateCommissionsScheduleComplete(res)),
    //                     catchError((err: string) => of(new fromActions.UpdateCommissionsScheduleFailed(err)))
    //                 );
    //         }));

    constructor(private actions$: Actions, private commissionsService$: fromServices.CommissionsService) { }
}
