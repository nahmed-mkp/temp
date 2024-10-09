import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';

import { catchError, map, switchMap } from 'rxjs/operators';

import * as fromActions from './../actions/drift.actions';
import * as fromModels from './../../models/drift.models';
import * as fromServices from './../../services/drift.service';
import { of } from 'rxjs';


@Injectable()
export class DriftEffects {

    @Effect()
    loadPositionsDrift$ = this.action$.pipe(
        ofType(fromActions.DriftActionTypes.LOAD_POSITIONS_DRIFT),
        map((action: fromActions.LoadPositionsDrift) => action.payload),
        switchMap((payload: fromModels.PositionsDriftRequest) => {
            return this.driftService$.getPositionsDrift(payload)
            .pipe(
                map((data: any) => new fromActions.LoadPositionsDriftComplete(data)),
                catchError(error => of(new fromActions.LoadPositionsDriftFailed(error)))
            );
        })
    );

    @Effect()
    loadPositionDrift$ = this.action$.pipe(
        ofType(fromActions.DriftActionTypes.LOAD_POSITION_DRIFT),
        map((action: fromActions.LoadPositionDrift) => action.payload),
        switchMap((payload: fromModels.PositionDriftRequest) => {
            return this.driftService$.getPositionDrift(payload)
                .pipe(
                    map((data: any[]) => new fromActions.LoadPositionDriftComplete(data)),
                    catchError(error => of(new fromActions.LoadPositionDriftFailed(error)))
                );
        })
    );


    @Effect()
    loadPnl$ = this.action$.pipe(
        ofType(fromActions.DriftActionTypes.LOAD_PNL),
        map((action: fromActions.LoadPnL) => action.payload),
        switchMap((payload: fromModels.PnlLoadRequest) => {
            return this.driftService$.loadPnl(payload)
                .pipe(
                    map((data: any[]) => new fromActions.LoadPnLComplete(data)),
                    catchError(error => of(new fromActions.LoadPnLFailed(error)))
                );
        })
    );

    constructor(private action$: Actions,
        private driftService$: fromServices.DriftService) { }
}
