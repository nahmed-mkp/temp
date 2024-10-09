import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';

import * as fromModels from './../../models/drift-new.models';
import * as fromServices from './../../services/drift-new.services';
import * as fromActions from './../actions/drift-new.actions';
import { catchError, map, switchMap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DriftNewEffects {
    
    @Effect() 
    loadFundPodTradeDrift$ = this.actions$.pipe(
        ofType(fromActions.DriftNewActionTypes.LOAD_FUND_POD_TRADE_DRIFT),
        map((action: fromActions.LoadFundPodTradeDrift) => action.payload),
        switchMap((payload: fromModels.IDriftParams) => {
            return this.driftService$
                .loadFundPodTradeDrift(payload)
                .pipe(
                    map((res: any[]) => new fromActions.LoadFundPodTradeDriftComplete(res)),
                    catchError((err: any) => of(new fromActions.LoadFundPodTradeDriftFailed(err)))
                );
        })
    );

    constructor(
        private actions$: Actions,
        private driftService$: fromServices.DriftNewService
    ) {}
}