import { Injectable } from '@angular/core';
import { Observable, of, empty } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, catchError, switchMap } from 'rxjs/operators';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromModels from '../../models/allocations.models';
import * as fromServices from '../../services/allocations.service';
import * as fromActions from '../actions/allocations.actions';

@Injectable()
export class AllocationsEffects {

    @Effect()
    loadAllocationTriggers$: Observable<Action> = this.actions$
        .pipe(
            ofType(fromActions.AllocationActionTypes.LOAD_ALLOCATION_TRIGGERS),
            switchMap(() => {
                return this.allocationsService$
                    .getAllocationTriggers()
                    .pipe(
                        map((res: fromModels.IAllocationTrigger[]) => new fromActions.LoadAllocationTriggersComplete(res)),
                        catchError((err: string) => of(new fromActions.LoadAllocationTriggersFailed(err))
                    ));
            })
        );

    constructor(
        private actions$: Actions,
        private allocationsService$: fromServices.AllocationsService
    ) { }
}
